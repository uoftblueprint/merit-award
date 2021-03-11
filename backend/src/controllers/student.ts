import { Request, Response } from 'express';
import { Recommender, Student } from '../models/UserType';
import UserModel from '../models/User';
import { User, RecommendationInterface, RecommenderInterface } from '../types';
import crypto from 'crypto';
import querystring from 'querystring';

const addReviewToRecommender = async (recommenderUser: User, studentUser: User, recommendation: RecommendationInterface) => {
    const recommender = await Recommender.findById(recommenderUser.recommender);
    recommender.recommendations.forEach((rec: RecommendationInterface) => {
        console.log(rec)
        console.log(studentUser)
        if (String(rec.student) === String(studentUser.student)) {
            console.log("MATCHING")
            throw new Error('Recommendation already requested from this user')
        }
    })
    recommender.recommendations.push(recommendation);
    recommender.save();
}

const makeUserRecommender = async (recommenderUser: User, studentUser: User, recommendation: RecommendationInterface) => {
    try {
        const recommender = await Recommender.create({ user: recommenderUser._id });
        recommenderUser.recommender = recommender._id;
        recommender.recommendations.push(recommendation)
        recommender.save();
        recommenderUser.save();
    } catch (e) {
        return e;
    }
}

const createRecommenderSignUp = async (recommenderEmail: string, studentUser: User, recommendation: RecommendationInterface) => {
    const student = await Student.findById(studentUser.student);
    student.recommenderRequest.forEach((email: string) => {
        if (email == recommenderEmail) {
            console.log("MATCHING")
            throw new Error('Recommendation already requested from this user')
        }
    })
    student.recommenderRequest.push(recommenderEmail)
    student.save();
    return {url: querystring.stringify({m: recommendation.message, id: String(studentUser.student), r: recommendation.relationship})};
}

export const updateReccomendation = async(req: Request, res: Response) => {
    const recomendation = req.body as RecommendationInterface;
    const user = req.user as User;
    const reccomender = Recommender.findById(user.id) as RecommenderInterface;
    reccomender.recommendations.forEach(element => {
        if (element.student == recomendation.student) {
            element = recomendation;
        }
    });
    reccomender.save();
}

export const inviteRecommender = async(req: Request, res: Response) => {
    const studentUser = req.user as User;
    console.log(studentUser)
    
    const recommenderEmail = req.body.email;

    const recommendation = {student: studentUser.student, status: "requested", relationship: String(req.body.relationship), message: String(req.body.message)} as RecommendationInterface;

    const recommenderUser = await UserModel.findOne({ email: recommenderEmail });

    if (recommenderUser && recommenderUser.recommender) {
        // add review to recommender
        try {
            await addReviewToRecommender(recommenderUser, studentUser, recommendation);
            return res.send({error: "review added"});
        } catch (e) {
            return res.status(500).send({error: e.message});
        }
    } else if (recommenderUser) {
        try {
            await makeUserRecommender(recommenderUser, studentUser, recommendation);
            return res.send({message: "recommendation sent"});
        } catch (e) {
            return res.status(500).send({error: e.message});
        }
    } else {
        // create ghost recommender and add recommendation request
        try {
            const recommenderSignUpCreated = await createRecommenderSignUp(recommenderEmail, studentUser, recommendation);
            return res.send(recommenderSignUpCreated);
        } catch (e) {
            console.log(e)
            return res.status(500).send({error: e.message});
        }
    }
}
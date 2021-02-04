import { Request, Response } from 'express'
import { FormModel } from '../models/Form'
import { UserApplication } from '../models/UserApplication'
import { updateQuestions } from '../forms/forms'
import { User } from '../types'

//This is the route used when updating the MongoDB with the airtable
export const updateRoute = async(_: Request, res: Response) => {
    const form = await updateQuestions()
    if (await FormModel.exists({name: "Student"})) {
        await FormModel.deleteOne({name:"Student"});
    }
    await FormModel.create(form)
    return res.json(form)
}

//getQuestions queries the MongoDB and returns the ENTIRE form
export const getQuestions = async(_: Request, res: Response) => {
    return res.json(await FormModel.findOne({name:"Student"}));
}


//getPage returns all sections in a certain page
export const getPage = async(req: Request, res: Response) => {
    const pageNumber = req.params["page"];
    try {
        const form = await FormModel.findOne({name: "Student"})
        return res.json(form["pages"].get(pageNumber))
    }
    catch (e) {
        console.log(e)
    }
    return res.send("error")
}

export const postForm = async(req: Request, res: Response) => {
    const answers = req.body;
    const user = req.user as User;
    let a = new Map<string, [string]>()
    const exists = await UserApplication.exists({user: user._id})
    if (exists) {
        const x = await UserApplication.find({user: user._id})
        a = x[0].studentSubmissions.answers
    }
    for (let i in answers) {
        if (typeof answers[i] == "string") {
            a.set(i, [answers[i]])
        }
        else {
            a.set(i, answers[i])
        }
    }
    if (!exists) {
        await UserApplication.create({user: user._id, studentSubmissions: {_id: "0", name:"Student", answers: a}})
    }
    else{
        const q = await UserApplication.find({user: user._id})
        const entry = q[0]
        entry.studentSubmissions.answers = a
        await entry.save()
    }
    return res.send('working')
}
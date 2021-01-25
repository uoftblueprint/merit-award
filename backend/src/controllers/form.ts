import { Request, Response } from 'express'
import { FormModel } from '../models/Form'
import { updateQuestions } from '../forms/forms'

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
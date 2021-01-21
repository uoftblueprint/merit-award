import airtable = require('airtable')
import { Request, Response } from 'express'
import { FormModel } from '../models/Form'


const base = airtable.base('appt2jmmk7EWPzIkp');

const table = base("StudentApplication")

const getRecords = async() => {
  return await table.select({view:'Grid view'}).all();
}

export const questions = async (req: Request, res: Response) => {
  const records = await getRecords();
  const jsons = records.map(
    function f(r){
      return r._rawJson;
    }
  )
  return res.json(jsons);
};

export const createPage = async(req: Request, res: Response) => {
  await FormModel.create({name: "test", sections: [{name: "test", repeatable: 0, label: "test", questions:[{text: "test", type:"test", charCount: 0}]}]})
  return res.json({hello: "hello"})
}
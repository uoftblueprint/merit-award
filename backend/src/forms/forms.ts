import airtable = require('airtable')
import { Request, Response } from 'express'

const base = airtable.base('appt2jmmk7EWPzIkp');

const table = base("StudentApplication")

const getRecords = async() => {
  return await table.select({view:'Grid view'}).firstPage();
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
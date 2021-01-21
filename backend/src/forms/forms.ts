import airtable = require('airtable')
import { Request, Response } from 'express'
import { FormModel } from '../models/Form'
import { Question, Form, Section } from "../types"


const base = airtable.base('appt2jmmk7EWPzIkp');

const questionTable = base("StudentApplication")
const descriptorsTable = base("StudentDescriptors")

const getQuestions = async() => {
  let questions = await questionTable.select({view:'Grid view'}).all();
  questions = questions.map(
    function(r) {
      return r._rawJson;
    }
  )
  return questions;
}

const getDescriptors = async() => {
  let descriptors =  await descriptorsTable.select({view: 'Grid view'}).all();
  descriptors = descriptors.map(
    function(r) {
      return r._rawJson;
    }
  )
  return descriptors;
}

// function createSection(q: object, d: object) {
//   for (const entries in d) {
//     const curr = d[entries]
//     if (curr["Name"] == q["Section Name"]){
//       const sec : Section = {
//         name: q["Section Name"],
//         repeatable: curr["Repeatable"],
//         label: curr["Label"],
//         questions: []
//       }
//       return sec
//     }
//   }
//   const sec : Section = {
//     name: q["Section Name"],
//     repeatable: 0,
//     label: "none",
//     questions: []
//   }
//   return sec
// }

export const processQuestions = async (req: Request, res: Response) => {
  const questions = await getQuestions();
  const descriptors = await getDescriptors();
  const form: Form = {name:"Student", pages:{}}
  let lastPage = "";
  let lastSection = "";
  let currSection: Section = {name:"empty", label: "", questions:[], repeatable:0};
  for (const entries in questions) {
    const current = questions[entries]["fields"]
    if (current["PageNumber"] == lastPage) {
      if (current["Section Name"] == lastSection) {
        const q: Question = {text: current["Text"], type: current["Type"], charCount: current["CharCount"]}
        currSection.questions.push(q)       
      }
      else {
        lastSection = current["Section Name"]
        form.pages[lastPage].push(currSection)
        currSection = {
          name: current["Section Name"],
          label: "none",
          repeatable: 0,
          questions: []
        }
        currSection.questions.push({
          text: current["Text"],
          type: current["Type"],
          charCount: current["CharCount"]
        })
      }
    }
    else {
      if (current["PageNumber"] != "1") {
        form.pages[lastPage].push(currSection)
      }
      lastPage = current["PageNumber"]
      lastSection = current["Section Name"]
      form.pages[lastPage] = []
      currSection = {
        name: current["Section Name"],
        repeatable: 0,
        label: "none",
        questions: []
      }
      currSection.questions.push({
        text: current["Text"],
        type: current["Type"],
        charCount: current["CharCount"]
      })
    }
  }
  form.pages[lastPage].push(currSection)
  await FormModel.create(form)
  return res.json(form)
};

export const createPage = async(req: Request, res: Response) => {
  await FormModel.create({name: "test", pages: {"1": {name: "test", repeatable: 0, label: "test", questions:[{text: "test", type:"test", charCount: 0}]}}})
  return res.json({hello: "hello"})
}
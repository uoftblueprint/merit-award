import airtable = require('airtable')
import { Request, Response } from 'express'
import { FormModel } from '../models/Form'
import { Question, Form, Section } from "../types"


const base = airtable.base('appt2jmmk7EWPzIkp');

const questionTable = base("StudentApplication")
const descriptorsTable = base("StudentDescriptors")

interface airtableQuestion {
  pageNumber: string,
  sectionName: string,
  text: string,
  type: string,
  charCount: number
}

interface airtableDescriptor {
  name: string,
  repeatable: number,
  label: string
}


const getAirtableQuestions = async() => {
  const questions = await questionTable.select({view:'Grid view'}).all();
  return questions.map(
    function(r) {
      let c = r._rawJson
      c = c["fields"]
      const a : airtableQuestion = {
        pageNumber: c["PageNumber"],
        sectionName: c["Section Name"],
        text: c["Text"],
        type: c["Type"],
        charCount: c["CharCount"]
      }
      return a;
    }
  )
}

const getDescriptors = async() => {
  const descriptors = await descriptorsTable.select({view: 'Grid view'}).all();
  return descriptors.map(
    function(r) {
      let c = r._rawJson
      c = c["fields"]
      const a : airtableDescriptor = {
        name: c["Name"],
        repeatable: c["Repeatable"],
        label: c["Label"]
      }
      return a;
    }
  )
}

function createSection(q: airtableQuestion, d: airtableDescriptor[]) {
  const sec : Section = {
    name: q.sectionName,
    repeatable: 0,
    label: "none",
    questions: []
  }
  for (const entries in d) {
    const curr = d[entries]
    if (curr.name == q.sectionName){
      sec.repeatable = curr.repeatable
      sec.label = curr.label
      return sec
    }
  }
  return sec
}

function createQuestion(q: airtableQuestion) {
  return {
    text: q.text,
    type: q.type,
    charCount: q.charCount
  }
}

export const updateQuestions = async (req: Request, res: Response) => {
  if (await FormModel.exists({name: "Student"})) {
    await FormModel.deleteOne({name:"Student"});
  }
  const questions = await getAirtableQuestions();
  const descriptors = await getDescriptors();
  const form: Form = {name:"Student", pages:{}}
  let lastPage = "";
  let lastSection = "";
  let currSection: Section = {name:"empty", label: "", questions:[], repeatable:0};
  for (const entries in questions) {
    const current = questions[entries]
    if (current.pageNumber == lastPage) {
      if (current.sectionName == lastSection) {
        const q: Question = createQuestion(current)
        currSection.questions.push(q)       
      }
      else {
        lastSection = current.sectionName
        form.pages[lastPage].push(currSection)
        currSection = createSection(current, descriptors)
        currSection.questions.push(createQuestion(current))
      }
    }
    else {
      if (current.pageNumber != "1") {
        form.pages[lastPage].push(currSection)
      }
      lastPage = current.pageNumber
      lastSection = current.sectionName
      form.pages[lastPage] = []
      currSection = createSection(current, descriptors)
      currSection.questions.push(createQuestion(current))
    }
  }
  form.pages[lastPage].push(currSection)
  await FormModel.create(form)
  return res.json(form)
};


export const getQuestions = async(req: Request, res: Response) => {
  return res.json(await FormModel.find({name:"Student"}));
}
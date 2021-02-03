import airtable = require('airtable')
import { Question, Form, Section } from "../types"

//This is the id of our airtable base
const base = airtable.base('appt2jmmk7EWPzIkp');

//These are the names of the tabs in our Airtable
const questionTable = base("StudentApplication")
const descriptorsTable = base("StudentDescriptors")

//airtableQuestion is the interface for the data when it first comes from
//Airtable
interface airtableQuestion {
  pageNumber: string,
  sectionName: string,
  text: string,
  type: string,
  charCount: number,
  options: string[]
}

//airtableDescriptor is the form that the initial Airtable data is put in
interface airtableDescriptor {
  name: string,
  repeatable: number,
  label: string
}

//getAirtableQuestions queries Airtable and returns a list of 
//Questions
const getAirtableQuestions = async() => {
  const questions = await questionTable.select({view:'Grid view'}).all();
  return questions.map(
    function(r) {
      let c = r._rawJson
      c = c["fields"]
      let options = []
      try {
        options = c["Options"].split(", ");
      }
      catch (e) {
        /* if options are empty, we pass empty array */
      }
      const a : airtableQuestion = {
        pageNumber: c["PageNumber"],
        sectionName: c["Section Name"],
        text: c["Text"],
        type: c["Type"],
        charCount: c["CharCount"],
        options: options
      }
      return a;
    }
  )
}

//getDescriptors queries the Airtable for info on each section
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

//createSection merges info on a section from a question and a list of
//descriptors into one Section
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


//createQuestion takes the airtable row and turns it into a Question
function createQuestion(q: airtableQuestion) {
  return {
    text: q.text,
    type: q.type,
    charCount: q.charCount,
    options: q.options
  }
}


//updateQuestions uses the Airtable questions + descriptors and
//combines them into Form data type for mongodb
export const updateQuestions = async () => {
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
  return form
};

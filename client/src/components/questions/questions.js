import { fetch } from "node-fetch";
import axios from "axios";

class Question {
    constructor(id, page_number, question_type, text, hint, options) {
        this.id = id
        this.page_number = page_number
        this.question_type = question_type
        this.text = text
        this.hint = hint
        this.options = options
    }
}
 
// getQuestions creates a fetch request to the go server for the questions
async function getQuestions() {
    // temporary endpoint for go server
    const endpoint = "http://localhost:8080/getQuestions"
    console.log("inside getQs")
    // var ret =  await fetch(endpoint, {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       }
    // }).then((response) => response.json())
    // .then(function(data) {
    //     return data
    // })
    let res;
    try {
        res = await axios.get(
            endpoint,
          );
    }
    catch (e) {
        console.log(e)
    }
    console.log("inside getQs 2")
    console.log(res)

    return res
}

// convertQuestions converts the JSON to question types
async function convertQuestions() {
    var ret = await getQuestions()
    var converted = []
    for (let a=0;a<ret.length; a++){
        var current = ret[a]
        converted.push(new Question(current["ID"], current["page_number"], current["question_type"], current["text"], current["hint"], current["options"].split(",")))
    }
    return converted
}

export default Question;
export { getQuestions, convertQuestions };
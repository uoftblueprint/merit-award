const fetch = require("node-fetch");

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
    // temportary endpoint for go server
    const endpoint = "http://localhost:8080/getQuestions"
    var ret =  await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
    }).then((response) => response.json())
    .then(function(data) {
        return data
    })
    return ret
}

// convertQuestions converts the JSON to question types
async function convertQuestions() {
    var ret = await getQuestions()
    var converted = []
    for (a=0;a<ret.length; a++){
        var current = ret[a]
        converted.push(new Question(current["ID"], current["page_number"], current["question_type"], current["text"], current["hint"], current["options"].split(",")))
    }
    return converted
}

package importer

import (
	"errors"
	"os"
	"strconv"

	"github.com/fabioberger/airtable-go"
	"github.com/uoftblueprint/merit-award/server/api/models"
)

//the json from Airtable is converted to type Task
type task struct {
	AirtableID string
	Fields     struct {
		PAGENUMBER string
		TEXT       string
		HINT       string
		TYPE       string
		OPTIONS    string
		ATTACHMENT []airtable.Attachment
	}
}

//getTasks returns array of all entries in the sheet
func getTasks() ([]task, error) {
	airtableAPIKey := os.Getenv("AIRTABLE_API_KEY")
	baseID := "appt2jmmk7EWPzIkp"
	client, err := airtable.New(airtableAPIKey, baseID)
	if err != nil {
		return []task{}, err
	}
	retrievedTask := []task{}
	if err := client.ListRecords("StudentApplication", &retrievedTask); err != nil {
		return []task{}, err
	}
	return retrievedTask, err
}

//GetQuestions converts the task struct to the question type
func GetQuestions() ([]models.Question, error) {
	tasks, err := getTasks()
	if err != nil {
		return []models.Question{}, err
	}
	questions := []models.Question{}
	for i := range tasks {
		pageNumber, err := strconv.Atoi(tasks[i].Fields.PAGENUMBER)
		if err != nil {
			return []models.Question{}, errors.New("Invalid page number in airtable:" + tasks[i].Fields.PAGENUMBER)
		}
		questions = append(questions, models.Question{
			PageNumber:   pageNumber,
			QuestionType: tasks[i].Fields.TYPE,
			Text:         tasks[i].Fields.TEXT,
			Hint:         tasks[i].Fields.HINT,
			Options:      tasks[i].Fields.OPTIONS,
		})
	}
	return questions, err
}

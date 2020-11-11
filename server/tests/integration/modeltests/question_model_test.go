package modeltests

import (
	"github.com/uoftblueprint/merit-award/server/api/models"
	"gopkg.in/go-playground/assert.v1"
	"log"
	"testing"
)

// TestFindAllQuestions tests getting all questions from database
func TestFindAllQuestions(t *testing.T) {
	err := refreshQuestionTable()
	if err != nil {
		log.Fatal(err)
	}

	_, err = seedOneQuestion()
	if err != nil {
		log.Fatal(err)
	}

	questions, err := models.GetAllQuestions(server.DB)
	if err != nil {
		t.Errorf("this is the error getting the questions: %v\n", err)
		return
	}
	assert.Equal(t, len(*questions), 1)
}

// TestCreateQuestions tests saving a single question in the database
func TestCreateQuestions(t *testing.T) {
	err := refreshQuestionTable()
	if err != nil {
		log.Fatal(err)
	}
	newQuestion := models.Question{
		PageNumber:   1,
		QuestionType: "Multiple Choice",
		Text:         "This is the first question",
		Hint:         "Hint",
		Options:      "Yes, No",
	}
	savedQuestion, err := models.CreateQuestion(server.DB, newQuestion)
	if err != nil {
		t.Errorf("this is the error getting the users: %v\n", err)
		return
	}
	assert.Equal(t, savedQuestion.PageNumber, savedQuestion.PageNumber)
	assert.Equal(t, savedQuestion.QuestionType, savedQuestion.QuestionType)
	assert.Equal(t, savedQuestion.Text, savedQuestion.Text)
	assert.Equal(t, savedQuestion.Hint, savedQuestion.Hint)
	assert.Equal(t, savedQuestion.Options, savedQuestion.Options)
}

// TestGetQuestionByPage tests getting a question from the database table by its page number
func TestGetQuestionByPage(t *testing.T) {
	err := refreshQuestionTable()
	if err != nil {
		log.Fatal(err)
	}

	question, err := seedOneQuestion()
	if err != nil {
		log.Fatalf("cannot seed users table: %v", err)
	}
	foundQuestions, err := models.GetQuestionPage(server.DB, question.PageNumber)
	foundQuestion := (*foundQuestions)[0]
	if err != nil {
		t.Errorf("this is the error getting one user: %v\n", err)
		return
	}
	assert.Equal(t, foundQuestion.PageNumber, foundQuestion.PageNumber)
	assert.Equal(t, foundQuestion.QuestionType, foundQuestion.QuestionType)
	assert.Equal(t, foundQuestion.Text, foundQuestion.Text)
	assert.Equal(t, foundQuestion.Hint, foundQuestion.Hint)
	assert.Equal(t, foundQuestion.Options, foundQuestion.Options)
}

// TestDeleteQuestions tests deleting all questions from the database.
func TestDeleteQuestions(t *testing.T) {
	err := refreshUserTable()
	if err != nil {
		log.Fatal(err)
	}

	user, err := seedOneUser()

	if err != nil {
		log.Fatalf("Cannot seed user: %v\n", err)
	}
	err = models.DeleteQuestions(server.DB)
	_, err = userInstance.DeleteUser(server.DB, user.ID)
	if err != nil {
		t.Errorf("this is the error updating the user: %v\n", err)
		return
	}
	questions, err := models.GetAllQuestions(server.DB)
	if err != nil {
		t.Errorf("this is the error updating the user: %v\n", err)
		return
	}
	assert.Equal(t, 0, len(*questions))
}

package models

import (
	"gorm.io/gorm"
)

// Question is the question model in the database
type Question struct {
	gorm.Model
	PageNumber   int    `json:"page_number"`
	QuestionType string `json:"question_type"`
	Text         string `json:"text"`
	Hint         string `json:"hint"`
	Options      string `json:"options"`
}

// CreateQuestion creates Question in database from question
func CreateQuestion(db *gorm.DB, q Question) (*Question, error) {
	var err error
	if err = db.Create(&q).Error; err != nil {
		return &Question{}, err
	}
	return &Question{}, err
}

// GetAllQuestions returns all questions in the database
func GetAllQuestions(db *gorm.DB) (*[]Question, error) {
	var err error
	var questions []Question
	if err = db.Model(&Question{}).Find(&questions).Error; err != nil {
		return &[]Question{}, err
	}
	return &questions, err
}

// GetQuestionPage returns all questions on a specific page
func GetQuestionPage(db *gorm.DB, a int) (*[]Question, error) {
	var err error
	var questions []Question
	if err = db.Model(&Question{}).Where(*&Question{PageNumber: a}).Find(&questions).Error; err != nil {
		return &[]Question{}, err
	}
	return &questions, err
}

// DeleteQuestions deletes all question entries in the database
func DeleteQuestions(db *gorm.DB) error {
	if err := db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&Question{}).Error; err != nil {
		return err
	}
	return nil
}

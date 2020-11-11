package modeltests

import (
	"fmt"
	"log"
	"os"
	"testing"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	// "github.com/joho/godotenv"
	"github.com/uoftblueprint/merit-award/server/api/controllers"
	"github.com/uoftblueprint/merit-award/server/api/models"
)

var server = controllers.Server{}
var userInstance = models.User{}
var questionInstance = models.Question{}

// TestMain connects to the database and ensures there are no errors.
func TestMain(m *testing.M) {
	Database()
	os.Exit(m.Run())
}

// Database connects to database and reports any errors.
func Database() {
	var err error
	dsn := "host=localhost port=5432 user=meritawarduser dbname=meritaward sslmode=disable password=password"

	log.Println(dsn)

	server.DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Printf("Cannot connect to database\n")
		log.Fatal("This is the error:", err)
	} else {
		fmt.Printf("We are connected to the database\n")
	}
}

// refreshUserTable drops and migrates the User table.
func refreshUserTable() error {
	server.DB.Migrator().DropTable(&models.User{})
	server.DB.AutoMigrate(&models.User{})
	return nil
}

// refreshQuestionTable drops and migrates the Question table.
func refreshQuestionTable() error {
	server.DB.Migrator().DropTable(&models.Question{})
	server.DB.AutoMigrate(&models.Question{})
	return nil
}

// seedOneUser creates a single user in the database.
func seedOneUser() (models.User, error) {
	refreshUserTable()

	user := models.User{
		Username: "Pet",
		Email:    "pet@gmail.com",
		Password: "password",
	}

	err := server.DB.Model(&models.User{}).Create(&user).Error
	if err != nil {
		log.Fatalf("cannot seed users table: %v", err)
	}
	return user, nil
}

// seedUsers creates multiple users in the database.
func seedUsers() error {
	users := []models.User{
		models.User{
			Username: "Steven victor",
			Email:    "steven@gmail.com",
			Password: "password",
		},
		models.User{
			Username: "Kenny Morris",
			Email:    "kenny@gmail.com",
			Password: "password",
		},
	}

	for i, _ := range users {
		err := server.DB.Model(&models.User{}).Create(&users[i]).Error
		if err != nil {
			return err
		}
	}
	return nil
}

//seedOneQuestion creates a single question
func seedOneQuestion() (models.Question, error) {
	refreshQuestionTable()
	question := models.Question{
		PageNumber:   2,
		QuestionType: "Free Response",
		Text:         "Please give answer",
		Hint:         "Hint number two",
		Options:      "",
	}
	err := server.DB.Model(&models.Question{}).Create(&question).Error
	if err != nil {
		log.Fatalf("cannot seed questions table: %v", err)
	}
	return question, err
}

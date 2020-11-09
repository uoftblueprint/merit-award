package modeltests

import (
	"fmt"
	"log"
	"os"
	"testing"
	
	"gorm.io/gorm"
	"gorm.io/driver/postgres"

	// "github.com/joho/godotenv"
	"github.com/uoftblueprint/merit-award/server/api/controllers"
	"github.com/uoftblueprint/merit-award/server/api/models"
)


var server = controllers.Server{}
var userInstance = models.User{}

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

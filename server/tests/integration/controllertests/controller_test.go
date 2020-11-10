package controllertests

import (
	"fmt"
	"log"
	"os"
	"testing"
	
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

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

func refreshUserTable() error {
	server.DB.Migrator().DropTable(&models.User{})
	server.DB.AutoMigrate(&models.User{})
	log.Printf("Successfully refreshed table")
	return nil
}

// seedOneUser creates a single user in the database.
func seedOneUser() (models.User, error) {
	err := refreshUserTable()
	if err != nil {
		log.Fatal(err)
	}

	user := models.User{
		Username: "Rish",
		Email:    "rishab@google.com",
		Password: "password",
	}

	err = server.DB.Model(&models.User{}).Create(&user).Error
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

// seedUsers createss multiple users in the database.
func seedUsers() ([]models.User, error) {
	var err error
	if err != nil {
		return nil, err
	}
	users := []models.User{
		models.User{
			Username: "Rish our leader",
			Email:    "rishab@google.com",
			Password: "password",
		},
		models.User{
			Username: "Antoine Finot",
			Email:    "antoine@gmail.com",
			Password: "password",
		},
	}
	for i, _ := range users {
		err := server.DB.Model(&models.User{}).Create(&users[i]).Error
		if err != nil {
			return []models.User{}, err
		}
	}
	return users, nil
}

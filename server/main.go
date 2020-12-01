package main

import (
	"flag"
	"log"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/uoftblueprint/merit-award/server/api/controllers"
	"github.com/uoftblueprint/merit-award/server/api/middlewares"
	"github.com/uoftblueprint/merit-award/server/api/models"
)

// connectDB connects to Postgres database
func connectDB(production *bool) *gorm.DB {
	var dsn string

	if *production == true {
		dsn = "host=meritaward.cbqwbpdg0mwb.us-east-1.rds.amazonaws.com port=5432 user=postgres sslmode=disable password=" + os.Getenv("meritawarddb")
	} else {
		dsn = "host=localhost port=5432 user=meritawarduser dbname=meritaward sslmode=disable password=password"
	}

	log.Println(dsn)
	log.Println(production)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.Migrator().DropTable(&models.User{})
	db.AutoMigrate(&models.User{})

	db.Migrator().DropTable(&models.Question{})
	db.AutoMigrate(&models.Question{})

	fooPassword, err := models.HashPassword("foo")
	rishPassword, err := models.HashPassword("rish")

	db.Create(&models.User{
		Username: "foo",
		Email:    "foo@bar.com",
		Password: fooPassword,
	})

	db.Create(&models.User{
		Username: "Rish God",
		Email:    "rish@google.com",
		Password: rishPassword,
	})

	db.Create(&models.Question{
		PageNumber:   1,
		QuestionType: "Input Text",
		Text:         "What is your full name?",
		Hint:         "extra hint 1",
		Options:      "",
	})
	db.Create(&models.Question{
		PageNumber:   2,
		QuestionType: "Single Select",
		Text:         "How is merit award?",
		Hint:         "",
		Options:      "great,very great,super great",
	})
	db.Create(&models.Question{
		PageNumber:   2,
		QuestionType: "Checkbox",
		Text:         "How cool is Rish? Select all that apply.",
		Hint:         "",
		Options:      "cool,very cool,super cool",
	})
	db.Create(&models.Question{
		PageNumber:   1,
		QuestionType: "Email",
		Text:         "What is your email?",
		Hint:         "example@gmail.com",
		Options:      "",
	})
	db.Create(&models.Question{
		PageNumber:   1,
		QuestionType: "Phone Number",
		Text:         "What is your phone number?",
		Hint:         "416-123-4567",
		Options:      "",
	})
	return db
}

// main runs our server
func main() {
	production := flag.Bool("production", false, "production")
	flag.Parse()
	log.Println(*production)
	db := connectDB(production)
	server := controllers.NewServer(db)

	setupServer(server).Run()
}

// setupServer sets up appropriate routes
func setupServer(server *controllers.Server) *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.GET("/health", health)
	// Login Route
	r.POST("/login", server.Login)

	//Users routes
	r.POST("/users", server.CreateUser)
	r.GET("/users/:id", server.GetUser)

	authorized := r.Group("/")
	authorized.Use(middlewares.Auth())
	{
		authorized.GET("/users", server.GetUsers)
	}

	userIDRoutes := r.Group("/users/:id")
	userIDRoutes.Use(middlewares.Auth())
	{
		userIDRoutes.PUT("/", server.UpdateUser)
		userIDRoutes.DELETE("/", server.DeleteUser)
	}

	//Questions route
	r.GET("/updateQuestions", server.UpdateQuestions)
	r.GET("/getQuestions", server.GetQuestions)
	r.GET("/getQuestions/:page", server.GetQuestionPage)

	return r
}

// health is an API endpoint used as a status check for server
func health(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "still running",
	})
}

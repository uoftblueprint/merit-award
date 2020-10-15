package main

import (
	"flag"
	"log"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	. "github.com/uoftblueprint/merit-award/server/api/controllers"
	"github.com/uoftblueprint/merit-award/server/api/middlewares"
	"github.com/uoftblueprint/merit-award/server/api/models"
)

var DB *gorm.DB

func connectDB(server Server, production *bool) {
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

	db.AutoMigrate(&models.User{})
	server.DB = db
}

func main() {
	server := Server{}
	production := flag.Bool("production", false, "production")
	flag.Parse()
	log.Println(*production)
	connectDB(server, production)

	server.DB.Create(&models.User{
		Username: "Foo Bar",
		Email:    "Foo@bar.com",
		Password: "password",
	})

	server.DB.Create(&models.User{
		Username: "Rish God",
		Email:    "rish@google.com",
		Password: "password",
	})

	setupServer(server).Run()
}

func setupServer(server Server) *gin.Engine {
	r := gin.Default()
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.GET("/health", health)

	// Login Route
	r.POST("/login", server.Login)

	//Users routes
	r.POST("/users", server.CreateUser)
	r.GET("/users", server.GetUser)
	r.GET("/users/{id}", server.GetUser)

	userIdRoutes := r.Group("/users/{id}")
	userIdRoutes.Use(middlewares.Auth())
	{
		userIdRoutes.PUT("/users/{id}", server.UpdateUser)
		userIdRoutes.DELETE("/users/{id}", server.DeleteUser)
	}

	return r
}

func health(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "running",
	})
}

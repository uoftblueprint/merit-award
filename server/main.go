package main

import (
	"flag"
	"log"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type User struct {
	gorm.Model
	name  string
	email string
}

func connectDB(production *bool) {
	var dsn string

	if *production == true {
		dsn = "host=meritaward.cbqwbpdg0mwb.us-east-1.rds.amazonaws.com port=5432 user=postgres sslmode=disable password=" + os.Getenv("meritawarddb")
	} else {
		dsn = "host=localhost port=5432 user=meritawarduser dbname=meritaward sslmode=disable"
	}

	log.Println(dsn)
	log.Println(production)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&User{})
	DB = db
}

func main() {

	production := flag.Bool("production", false, "production")
	flag.Parse()
	log.Println(*production)
	connectDB(production)

	r := gin.Default()
	r.Use(static.Serve("/", static.LocalFile("./web", true)))
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "running",
		})
	})
	r.Run()
}

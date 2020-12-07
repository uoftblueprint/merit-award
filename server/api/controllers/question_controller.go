package controllers

import (
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/uoftblueprint/merit-award/server/api/importer"
	"github.com/uoftblueprint/merit-award/server/api/models"
)

// UpdateQuestions queries Airtable and adds all of the entries into the database
func (server *Server) UpdateQuestions(c *gin.Context) {
	questions, err := importer.GetQuestions()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = models.DeleteQuestions(server.DB)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	for i := range questions {
		_, err := models.CreateQuestion(server.DB, questions[i])
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
	}
	c.JSON(200, gin.H{"result": "Questions successfully taken from Airtable"})
}

// GetQuestions returns all question entries from the database
func (server *Server) GetQuestions(c *gin.Context) {
	ret, err := models.GetAllQuestions(server.DB)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, ret)
}

// GetQuestionPage returns all questions on a given page
func (server *Server) GetQuestionPage(c *gin.Context) {
	page, err := strconv.Atoi(c.Param("page"))
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid page number: " + c.Param("page")})
		return
	}
	questions, err := models.GetQuestionPage(server.DB, page)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, questions)
}

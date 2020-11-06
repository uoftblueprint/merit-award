package middlewares

import (
	"errors"

	"github.com/gin-gonic/gin"
	"github.com/uoftblueprint/merit-award/server/api/auth"
)

// Auth handles authentication given a JWT token in request
func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := auth.TokenValid(c.Request)
		if err != nil {
			c.AbortWithError(401, errors.New("Unauthorized"))
		}
	}
}

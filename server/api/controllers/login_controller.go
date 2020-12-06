package controllers

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"fmt"

	"github.com/gin-gonic/gin"

	"github.com/uoftblueprint/merit-award/server/api/auth"
	"github.com/uoftblueprint/merit-award/server/api/models"
	"github.com/uoftblueprint/merit-award/server/api/utils"
	"golang.org/x/crypto/bcrypt"
	jwt "github.com/dgrijalva/jwt-go"
)

// Login will log in as a user based on the data given in the request body.
// Required fields: email, password
func (server *Server) Login(c *gin.Context) {
	var w http.ResponseWriter = c.Writer
	var r *http.Request = c.Request
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		utils.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
		
	type PostBody struct {
		Method  string `json:"method"`
		Headers struct {
			Accept      string `json:"Accept"`
			ContentType string `json:"Content-Type"`
		} `json:"headers"`
		Data string `json:"data"`
		Mode string `json:"mode"`
	}
	var pb PostBody;
	err = json.Unmarshal(body, &pb)
	if err != nil {
		utils.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	user := models.User{}
	err = json.Unmarshal([]byte(pb.Data), &user)
	if err != nil {
		utils.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}

	user.SetUpUser()
	err = user.ValidateLogin()
	if err != nil {
		utils.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	jwt, refreshToken, err := server.SignIn(user.Email, user.Password)
	if err != nil {
		formattedError := utils.FormatError(err.Error())
		utils.ERROR(w, http.StatusUnprocessableEntity, formattedError)
		return
	}
	tokens := map[string]string{
		"jwtToken": jwt,
		"refreshToken": refreshToken,
	}
	utils.JSON(w, http.StatusOK, tokens)
}

// SignIn signs in as a user based on the email and password passed in.
// Returns created JWT
func (server *Server) SignIn(email, password string) (string, string, error) {
	var err error

	user := models.User{}

	err = server.DB.Debug().Model(models.User{}).Where("email = ?", email).Take(&user).Error
	if err != nil {
		return "", "", err
	}
	
	err = models.VerifyPassword(password, user.Password)
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		return "", "", err
	}
	return auth.CreateTokenPair(user.ID)
}

// Refresh will validate the refresh token and return a new JWT
// This expects a POST body with parameter refreshToken
func (server *Server) Refresh(c *gin.Context) {
	var w http.ResponseWriter = c.Writer
	var r *http.Request = c.Request
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		utils.ERROR(w, http.StatusUnprocessableEntity, err)
	}

	// Struct type to hold POST body info
	type tokenReqBody struct {
		RefreshToken string `json:"refreshToken"`
		ID uint32 `json:"id"`
	}
	tokenReq := tokenReqBody{}
	err = json.Unmarshal(body, &tokenReq)

	// Validate refresh token
	token, err := jwt.Parse(tokenReq.RefreshToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})
	
	// Return new refresh token if valid
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if userID, ok := claims["user_id"].(float64); ok {
			jwtToken, refreshToken, err := auth.CreateTokenPair(uint32(userID))
			if err != nil {
				return
			}
			newTokenPair := map[string]string{
				"jwtToken": jwtToken,
				"refreshToken": refreshToken,
			}
			utils.JSON(w, http.StatusOK, newTokenPair)
		} else {
			fmt.Printf("Invalid User ID type, should be float64: %v\n", claims["user_id"]);
		}
	}
}

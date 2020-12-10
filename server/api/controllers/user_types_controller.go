package controllers

import (
	"encoding/json"
	// "errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/uoftblueprint/merit-award/server/api/models"
	"github.com/uoftblueprint/merit-award/server/api/utils"
)

// CreateUserType creates a new user type associated with given userID
func (server *Server) CreateUserType(c *gin.Context) {
	var w http.ResponseWriter = c.Writer
	var r *http.Request = c.Request

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		utils.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	fmt.Println("BODY :>>>>%v", body)

	uid, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ERROR(w, http.StatusBadRequest, err)
		return
	}

	userType := models.UserType{}
	err = json.Unmarshal(body, &userType)
	fmt.Println("USER TYPE :>>>>%v", userType)
	if err != nil {
		fmt.Println("USER TYPE ERROR :>>>>%v", err)
		utils.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
	// tokenID, err := auth.ExtractTokenID(r)
	// if err != nil || tokenID != uint32(uid) {
	// 	utils.ERROR(w, http.StatusUnauthorized, errors.New("Unauthorized"))
	// 	return
	// }
	
	createdUserType, err := userType.CreateUserType(server.DB, uint32(uid))
	fmt.Println("CREATED USER TYPE :>>>>%v", userType)
	if err != nil {
		fmt.Println("CREATED USER TYPE ERROR :>>>>%v", err)
		formattedError := utils.FormatError(err.Error())
		utils.ERROR(w, http.StatusInternalServerError, formattedError)
		return
	}
	utils.JSON(w, http.StatusOK, createdUserType)
}

// GetUserType gets an individual user type by ID.
func (server *Server) GetUserType(c *gin.Context) {
	var w http.ResponseWriter = c.Writer

	uid, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ERROR(w, http.StatusBadRequest, err)
		return
	}

	user := models.User{}
	userGotten, err := user.FindUserByID(server.DB, uint32(uid))

	if err != nil {
		utils.ERROR(w, http.StatusBadRequest, err)
		return
	}

	utils.JSON(w, http.StatusOK, userGotten)
}
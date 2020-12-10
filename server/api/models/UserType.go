package models

import (
	"time"
	"errors"
	"fmt"

	"gorm.io/gorm"
)

// UserType is a model in the database representing type of user: 
// Admin, Counselor, Reviewer, Recommender, Student
type UserType struct {
	ID uint32 `gorm:"primary_key;auto_increment" json:"id"`
	User User `json:"user"`
	UserID uint32 `gorm:"column:user_id"`
	Type string `gorm:"size:100;not null;unique" json:"type"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
}

// ValidateUserType validates that the valid parameters are passed in.
func (ut *UserType) ValidateUserType() error {
	if ut.Type == "" {
		return errors.New("Required User Type")
	}
	return nil
}

// CreateUserType creates a new usertype under a user
func (ut *UserType) CreateUserType(db *gorm.DB, userID uint32) (*UserType, error) {
	user := User{}
	foundUser, err := user.FindUserByID(db, userID)
	fmt.Println("FOUND USER :>>>>%v", foundUser)
	fmt.Println("FOUND USER ERROR :>>>>%v", err)

	if err != nil {
		return &UserType{}, err
	}

	ut.UserID = userID
	ut.User = *foundUser
	
	fmt.Println("USER TYPE :>>>>%v", ut)
	if err = db.Debug().Create(&ut).Error; err != nil {
		fmt.Println("CREATED ERROR :>>>>%v", err)
		return &UserType{}, err
	}
	
	fmt.Println("FINISHED CREATING USER TYPE :>>>>%v", ut)
	
	var userType UserType
	if err = db.Model(&UserType{}).Select("ID", "User", "UserID", "Type", "CreatedAt").Where("id = ?", ut.ID).Find(&userType).Error; err != nil {
		fmt.Println("FOUND USER TYPE ERROR :>>>>%v", err)
		return &UserType{}, err
	}

	fmt.Println("RETURNING USER TYPE :>>>>%v", ut)
	return &userType, nil
}

// FindUserTypeByID finds a user type in the database based on id
func (ut *UserType) FindUserTypeByID(db *gorm.DB, userID int) (*UserType, error) {
	if err := db.Model(&UserType{}).Select("ID", "User", "UserID", "Type", "CreatedAt").Where("id = ?", userID).Find(&ut).Error; err != nil {
		return &UserType{}, err
	}
	return ut, nil 
}




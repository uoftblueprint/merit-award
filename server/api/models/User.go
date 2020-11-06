package models

import (
	"errors"
	"html"
	"log"
	"strings"
	"time"

	"github.com/badoux/checkmail"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

// User is a user model in the database
type User struct {
	ID uint32 `gorm:"primary_key;auto_increment" json:"id"`
	Username string `gorm:"size:100;not null;unique" json:"username"`
	Email string `gorm:"size:254;not null;unique" json:"email"`
	Password string `gorm:"size:100;not null" json:"password"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

// HashPassword returns the password after it has been hashed
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// VerifyPassword returns true if password and hash are equivalent when hashed. False otherwise. 
func VerifyPassword(password, hash string) error {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
}

// SaveHashedPassword saves to the user model the hashed password.
func (u *User) SaveHashedPassword() error {
	hashedPassword, err := HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashedPassword
	return nil
}

// SetUpUser creates a temporary user with the following data
func (u *User) SetUpUser() {
	u.ID = 0
	u.Username = html.EscapeString(strings.TrimSpace(u.Username))
	u.Email = html.EscapeString(strings.TrimSpace(u.Email))
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
}

// ValidateUpdate validates that the valid parameters are passed in.
func (u *User) ValidateUpdate() error {
	if u.Username == "" {
		return errors.New("Required Username")
	}
	if u.Password == "" {
		return errors.New("Required Password")
	}
	if u.Email == "" {
		return errors.New("Required Email")
	}
	if err := checkmail.ValidateFormat(u.Email); err != nil {
		return errors.New("Invalid Email")
	}
	return nil
}

// ValidateLogin validates the valid parameters are passed in for the purpose of login.
func (u *User) ValidateLogin() error {
	if u.Password == "" {
		return errors.New("Required Password")
	}
	if u.Email == "" {
		return errors.New("Required Email")
	}
	if err := checkmail.ValidateFormat(u.Email); err != nil {
		return errors.New("Invalid Email")
	}
	return nil
}

// ORM Methods

// SaveUser saves the user in the database.
func (u *User) SaveUser(db *gorm.DB) (*User, error) {
	var err error
	if err = db.Debug().Create(&u).Error; err != nil {
		return &User{}, err
	}
	return u, nil
}

// FindAllUsers returns all of the users (maximum of 100)
func (u *User) FindAllUsers(db *gorm.DB) (*[]User, error) {
	var err error
	var users []User
	if err = db.Model(&User{}).Limit(100).Find(&users).Error; err != nil {
		return &[]User{}, err
	}
	return &users, err
}

// FindUserById returns a single user based on ID
func (u *User) FindUserByID(db *gorm.DB, uid uint32) (*User, error) {
	var err error
	if err = db.Debug().Model(User{}).Where("id = ?", uid).Take(&u).Error; err != nil {
		return &User{}, err
	}
	return u, err
}

// FindUserByUsername finds a user based on username
func (u *User) FindUserByUsername(db *gorm.DB, username string) (*User, error) {
	var err error
	if err = db.Debug().Model(User{}).Where("username = ?", username).Take(&u).Error; err != nil {
		return &User{}, err
	}
	return u, err
}

// UpdateUser updates user in the database with new parameters
func (u *User) UpdateUser(db *gorm.DB, uid uint32) (*User, error) {
	// To hash the password
	err := u.SaveHashedPassword()
	if err != nil {
		log.Fatal(err)
	}
	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).UpdateColumns(
		map[string]interface{}{
			"password":  u.Password,
			"username":  u.Username,
			"email":     u.Email,
			"updated_at": time.Now(),
		},
	)
	if db.Error != nil {
		return &User{}, db.Error
	}
	// This is the display the updated user
	err = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&u).Error
	if err != nil {
		return &User{}, err
	}
	return u, nil
}

// DeleteUser deletes a user in the database based on ID
func (u *User) DeleteUser(db *gorm.DB, uid uint32) (int64, error) {
	db = db.Debug().Model(&User{}).Where("id = ?", uid).Take(&User{}).Delete(&User{})

	if db.Error != nil {
		return 0, db.Error
	}
	return db.RowsAffected, nil
}

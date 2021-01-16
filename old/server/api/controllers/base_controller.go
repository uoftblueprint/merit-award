package controllers

import (
	"gorm.io/gorm"
)

var DB *gorm.DB

type Server struct {
	DB *gorm.DB
}

// NewServer returns a server struct.
func NewServer(db *gorm.DB) *Server {
	return &Server{
		DB: db,
	}
}

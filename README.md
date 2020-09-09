# The project is made for Practicing Authorization

### This project contains server end and client end

## Server

An authentication API Server

### Technologies used:

- express js
- MongoDB
- React

### some of the installed packages:

- `bcrypt-nodejs`: used in user model to encrypt user saved password
- `jwt-simple`: used to generate json web token, so when a user makes an auth request, they should include their JWT
- `passport`: authentication library for node and express, used for cookie based authentication, create a jwt strategy that attempts to authenticate a user given a JSON web token
- `passport-local`: used to create a local strategy that attempts to authenticate a user given only an email and a password
- `cors`: allow request from anywhere (localhost:3000)

# Issue Tracker API

A RESTful backend API for tracking issues/tasks. Users can create, view, and delete issues using HTTP requests.

The application is deployed publicly and connected to a MongoDB Atlas cloud database.

---

## Live Demo

You can test the API using Postman.

**GET request example:**

https://issue-tracker-n6i4.onrender.com/issues

Note: Since the API is hosted on Render's free tier, the first request may take a few seconds if the server is inactive.

---

## Features

- Create new issues
- Retrieve all issues
- Delete issues by ID
- Search issues using query parameters
- Pagination support for large datasets
- RESTful API design

---

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Git & GitHub
- Render (Deployment)
- Postman (API Testing)

---

## API Endpoints

GET /issues  
Returns all issues with support for search and pagination.

Example:
GET /issues?search=login&page=1&limit=5

POST /issues  
Creates a new issue.

DELETE /issues/:id  
Deletes an issue by ID.

---

## Deployment

The application is deployed on Render and connected to MongoDB Atlas for database management.

Deployment pipeline:
GitHub → Render → MongoDB Atlas

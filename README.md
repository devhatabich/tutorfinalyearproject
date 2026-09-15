# TutorMe – Peer Tutoring Platform

TutorMe is a **full-stack peer tutoring platform** designed to help students find academic support quickly while rewarding tutors through a gamified points system. The platform enables students to connect with peers, share study-related content, communicate in real time, schedule tutoring sessions, and earn points for completed meetings.

## Features

- Student profiles with authentication
- Study feed with posts, comments, and likes
- Real-time messaging with Socket.io
- Tutoring session scheduling with booking validation
- Rating and points reward system
- Google OAuth and JWT authentication
- Admin dashboard for content moderation
- Reporting system for inappropriate content and users

## Tech Stack

| Frontend | Backend | Cloud & DevOps | Testing |
|----------|---------|---------------|----------|
| React | Node.js | AWS EC2 | Jest |
| Tailwind CSS | Express.js | AWS S3 | Playwright |
| Socket.io Client | MongoDB | Docker | E2E Testing |
| Google OAuth | JWT | GitHub Actions | Integration Testing |

## Architecture

TutorMe follows the **MERN stack** architecture.

- **React** powers the user interface.
- **Express.js** and **Node.js** provide the REST API.
- **MongoDB** stores users, messages, meetings, posts, and ratings.
- **Socket.io** enables real-time messaging.
- **JWT** and **Google OAuth 2.0** provide secure authentication.

## Core Features

### Academic Feed

Students can create study-related posts, comment on discussions, and interact with other learners through a shared academic feed.

### Real-Time Messaging

Friends can exchange instant messages using Socket.io, with conversations stored securely in the database.

### Meeting Scheduling

Students can schedule tutoring sessions while backend validation prevents:

- Duplicate bookings
- Overlapping meetings
- Invalid scheduling attempts

This ensures fair participation and protects the integrity of the points system.

### Rating & Points System

After each completed tutoring session, students can leave a rating and points are transferred based on the session outcome, encouraging continued participation.

### Admin Dashboard

Administrators can moderate the platform by reviewing reported content, monitoring user activity, and managing inappropriate posts and messages.

## Deployment

TutorMe is deployed using a modern cloud-based workflow.

- Docker for containerisation
- AWS EC2 for application hosting
- AWS S3 for media storage
- GitHub Actions for automated CI/CD on every push

## Testing

The application includes automated testing across multiple levels.

- **Jest** for unit and integration testing
- **Playwright** for end-to-end testing of core user workflows

## Project Goal

TutorMe aims to create an engaging and supportive university learning environment by reducing the time needed to find academic help, encouraging peer-to-peer collaboration, and increasing student motivation through gamification and rewards.

## Tech Stack Summary

- React
- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Google OAuth 2.0
- Docker
- AWS EC2
- AWS S3
- GitHub Actions
- Jest
- Playwright

## License

This project was developed as a Final Year Software Development project.

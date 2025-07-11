
# Sportyfy: Sports Facility Booking Platform

**Live Link:** [https://sportyfy.devjunayed.xyz/](https://sportyfy.devjunayed.xyz/)  
**API Link:** [https://api.sportyfy.devjunayed.xyz/](https://api.sportyfy.devjunayed.xyz/)

## Introduction
Sportyfy is a comprehensive sports facility booking platform that enables users to easily find and book various sports facilities. Whether you're looking to play tennis, book a basketball court, or find a swimming pool, Sportyfy provides a seamless experience for both users and administrators. With a user-friendly interface and robust backend, Sportyfy aims to facilitate sports activities by simplifying the booking process.

## Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
3. [User Accounts](#user-accounts)
4. [Admin Accounts](#admin-accounts)
5. [API Endpoints](#api-endpoints)
6. [Technologies Used](#technologies-used)
7. [Contribution](#contribution)
8. [License](#license)

## Features
- User-friendly landing page for easy navigation.
- User and admin dashboards for managing bookings and facilities.
- Login and registration functionalities with social media integration.
- Facility listing and details pages.
- Booking page with availability checker and payment integration.
- Responsive design for mobile and desktop devices.
- Error handling and user notifications.

## Getting Started
To get started with the Sportyfy project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd sportyfy
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## User Accounts
### Demo User Account
- **Email:** user@gmail.com
- **Password:** user123

Users can sign up, log in, and manage their bookings through the user dashboard.

## Admin Accounts
### Demo Admin Account
- **Email:** admin@gmail.com
- **Password:** admin123

Administrators can manage facilities, bookings, and user accounts through the admin dashboard.

## API Endpoints
### User Routes
1. **User Sign Up**: `POST /api/auth/signup`
2. **User Login**: `POST /api/auth/login`

### Facility Routes (Admin Only)
3. **Create a Facility**: `POST /api/facility`
4. **Update a Facility**: `PUT /api/facility/:id`
5. **Delete a Facility**: `DELETE /api/facility/:id`
6. **Get All Facilities**: `GET /api/facility`

### Booking Routes
7. **Check Availability**: `GET /api/check-availability`
8. **Create a Booking**: `POST /api/bookings`
9. **View All Bookings**: `GET /api/bookings`
10. **View Bookings by User**: `GET /api/bookings/user`
11. **Cancel a Booking**: `DELETE /api/bookings/:id`

## Technologies Used
- React for the frontend
- Node.js and Express for the backend
- MongoDB for the database
- CSS/Tailwind/AntDesign/DaiysiUi for styling
- SSL Commerz for payment integration

## Contribution
Contributions are welcome! Please create an issue or submit a pull request for any features or bug fixes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Workforce ERP

## Overview
Workforce ERP is a comprehensive, scalable Enterprise Resource Planning solution designed to streamline HR operations, manage workforce productivity, and facilitate seamless organizational communication. 

## Key Features
- **Authentication & Authorization**: Role-based access control (Admin, HR, Manager, Employee).
- **Core HR Management**: Organization structure, team management, and employee profiles.
- **Time & Attendance**: Real-time check-in/out, automated absentee tracking, and holiday management.
- **Leave Management**: Automated workflow for leave requests, approvals, and balance tracking.
- **Task & Project Tracking**: Task assignment, workload monitoring, and deadline management.
- **Performance Management**: Goal setting, continuous feedback, and automated contribution scoring.
- **Analytics & Reporting**: Comprehensive dashboards and exportable reports (CSV/PDF) for attendance, workload, and team performance.
- **Workforce Command Center**: Real-time interactive office map with live attendance status.
- **Internal Communication**: Announcements, peer-to-peer recognition, and integrated messaging.

## Technology Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Testing**: Vitest

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance

### Installation
1. Clone the repository and install dependencies for both client and server:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. Configure environment variables based on `server/.env.example`.

3. Start the application:
   ```bash
   # Terminal 1 - Backend
   cd server
   npm start

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

## Documentation
For detailed deployment instructions, please refer to [DEPLOYMENT.md](DEPLOYMENT.md).

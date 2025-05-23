# Patients Lite

A lightweight patient records and medical information dashboard, built with React and Vite.

## Features

- Patient record management
- Modern, responsive UI with Tailwind CSS
- Local database support with PGLite
- Real-time synchronization capabilities

## Prerequisites
- npm package manager

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yogayataverma/PatientsLite.git

cd PatientsLite
```

2. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development Challenges

1. **Database Integration**
   - Initial challenges included understanding PGLite's usage and documentation.
   - Grasping the core concepts of PGLite's lightweight core code and its internal mechanisms.

2. **State Management**
   - Had to implement a robust state synchronization mechanism between different browser tabs
   - Ensuring data consistency across multiple components

## Live Demo

Visit the live application at: [Patients Lite](https://patientslite.netlify.app/)
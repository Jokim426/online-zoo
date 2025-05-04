# Online Zoo

An interactive online zoo where users can create and customize their own animals, interact with other animals in different enclosures, and train their animals in a private portal.

## Features
- User authentication (login/register)
- Animal creation and customization
- Interactive enclosures with real-time interactions
- Traffic control to limit publicly displayed animals
- Private training portal for users

## Tech Stack
- **Frontend**: React (TypeScript), TailwindCSS, Zustand, Axios
- **Backend**: Node.js (TypeScript), Express, PostgreSQL, Prisma, Socket.IO

## Setup
1. Clone the repository
2. Install dependencies: `npm install` in both `client` and `server` directories
3. Set up PostgreSQL database and update Prisma schema
4. Run migrations: `npx prisma migrate dev`
5. Start the server: `npm run dev` in `server` directory
6. Start the client: `npm run dev` in `client` directory

## Deployment
- Frontend: Deploy to Vercel/Netlify
- Backend: Deploy to Railway/Heroku
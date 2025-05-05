# Online Zoo

An interactive online zoo where users can create and customize animals, interact with others in enclosures, and train animals in a private portal.

## Features
- User authentication (login/register)
- Animal creation and customization
- Interactive enclosures with real-time interactions
- Traffic control for public animal display
- Private training portal

## Tech Stack
- **Frontend**: React (TypeScript), TailwindCSS, Zustand, Axios
- **Backend**: Node.js (TypeScript), Express, PostgreSQL, Prisma, Socket.IO

## Setup
1. Clone repository
2. Install dependencies: `npm install` in both `client` and `server`
3. Set up PostgreSQL database and update Prisma schema
4. Run migrations: `npx prisma migrate dev`
5. Start server: `npm run dev` in `server`
6. Start client: `npm run dev` in `client`

## Deployment
- Frontend: Vercel/Netlify
- Backend: Railway/Heroku
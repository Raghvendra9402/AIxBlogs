This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install all the dependencies

```bash
npm install
# or
pnpm install
# or
bun install
```

## Environment variables

add all these environment variables in .env in root folder

```bash
DATABASE_URL=<postgres_db_url>

AUTH_SECRET=<anything-secret-key>

GEMINI_API_KEY=<your-google-studio-api-key>
```

## Setup

run these commands

```bash
npx prisma migrate dev --name init
# or
pnpx prisma migrate dev --name init

node scripts/seed.ts
```

## Run the application

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

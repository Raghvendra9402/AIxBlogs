This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First,install pnpm(skip if already installed)

```bash
npm i -g pnpm
```

Then, install all the dependencies

```bash
pnpm install
```

## Environment variables

add all these environment variables in .env file in root folder

```bash
DATABASE_URL=<postgres_db_url>

AUTH_SECRET=<anything-secret-key>

GEMINI_API_KEY=<your-google-studio-api-key>
```

## Setup

run these commands

```bash
pnpx prisma migrate dev --name init

node scripts/seed.ts
```

## Run the application

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

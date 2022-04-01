# Coaster Seat Guru

[https://coasterseatguru.com](https://coasterseatguru.com)

Like that other trademarked seat rating website, but for roller coasters.

## Frontend

Frontend is written in Next.js with TypeScript.
Code is in the `/client` folder.
Run `npm run dev` in the `/client` folder to start a dev server.
Use `npm run build` to build the production site, which lives in `/docs` and is hosted on GitHub Pages.

## Backend

Backend consists of Azure Functions, with data in Cosmos DB.
Code is in the `/functions` folder.
Run `npm start` in the `/functions` folder to start a local copy of the functions.
Note that you'll need your own Cosmos instance to test with; see Microsoft's docs for hooking that up locally.
You'll also want to change the client to point to your local functions; the constant is called `API_ENDPOINT` inside `/client/utils/consts.ts`.

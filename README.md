# Wiki Scholar App

## Getting Started

First, install the dependencies:
`npm install`

Secondly, get a DeepL API key, create a .env similar to the same provided

Lastly, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Usage

Use the search bar to search for a topic and fetch it's summary and translation to study with ease.

## Design Documentation

This application makes use of the latest NextJS/React server components and other tools provided by NextJS wherever possible to provide a slick user experience. The application's functionality is complimented by daisyUI and tailwindCSS which serve to enhance the UX and provide a consistent and responsive UI. Cypress is used for ensuring quality and running e2e tests as Jest currently does not support async server functions. However Jest and React Testing Library are configured for future component testing uses.

## Future Possible Features

### Translate and chat with document
The DeepL API provides a way to translate documents and the chatGPT API can also ingest documents so that users can understand complex documents from other languages faster and easier.
# Next.js Project consuming the Business Management API with NextAuth.js Authentication

This is a simple Next.js project integrated with NextAuth.js for authentication, designed to consume an  the Business Management API from the  [repository](https://github.com/petpalioudakis/business-management-api.git).

## Pre-requisites

Before getting started, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- npm (installed with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/petpalioudakis/bm-api-nextjs-client.git
```

2. Navigate to the project directory:

```bash
cd <project-directory>
```

3. Install dependencies:

```bash
npm install
```

4. Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```


## Configuration

In the `.env` file, update the following variables with your own values:

- `NEXTAUTH_URL`: The base URL of your Next.js application for authentication.
- `NEXTAUTH_INTERNAL_URL`: The internal base URL of your Next.js application.
- `NEXT_PUBLIC_API_URL`: The base URL of the API from the other repository.
- `AUTH_SECRET`: A secure authentication secret generated for NextAuth.js. You can generate a secret using the following command:

```bash
npx auth secret
```
Add the generated secret to the `.env` file.

## Running the App

To start the development server, run:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the app.


## Consuming the API

Ensure that you have already downloaded and installed the API from the other repository. The API should be running and accessible from the provided `NEXT_PUBLIC_API_URL`.

## Deployment

Before deploying your application, make sure to set the `NEXTAUTH_URL`, `NEXT_PUBLIC_API_URL`, and `AUTH_SECRET` environment variables to the appropriate values for your production environment.

To build your Next.js app for production, run:

```bash
npm run build
```

You can then deploy the app using your preferred hosting provider.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)

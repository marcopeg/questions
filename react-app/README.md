# start.babelify.app

This is a React app based on ViteJS.

## Getting Started

```bash
yarn install
yarn start
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Shared Dev Environment

You can skip running the local Docker backend and use the **Shared Dev Environment** when you perform frontend tasks.

Just create a `.env.local` file and implement the environment variables as they are documented in `.env.example`


## Authentication

Use [jwt.io](https://jwt.io/) to generate valid tokens, then login by creating the `hasura-token` propery in LocalStorage.

**Example Payload:**

```json
{
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": "backoffice",
    "x-hasura-allowed-roles": [
      "backoffice",
      "user"
    ],
    "x-hasura-user-id": "mp"
  }
}
```

👉 Adapt this to your local user.


# Contributing

## Setup

Sensitive environment variables are stored in `.env.local`. "Set
`NEXT_VARIABLE`" means add `NEXT_VARIABLE=<value>` to `.env.local`.

* **AWS credentials**
  1. Create a user, e.g. `ethan-dev-actions`
  2. Add that user to the `developer-actions` and `nextjs-cognito-auth` groups.
  3. Create an access key.
  4. Set up credentials
     - Log in with the AWS CLI and set `NEXT_AWS_PROFILE` to the name of your
       profile in `~/.aws/configure`; **or**
     - Set `NEXT_AWS_ACCESS_KEY_ID` to your access key ID and
       `NEXT_AWS_SECRET_ACCESS_KEY` to your secret access key.

* **Database**
  - Your AWS credentials must have access to key secrets in the AWS Secrets
    Manager. Add your user to the `developer-actions` and `nextjs-cognito-auth`
    groups if you have not already.
  - Set `NEXT_PG_DATABASE` to "dev" or to the name of the Postgres database
    you're testing with.

## Entry Point

We are using a custom entry point, [server.js](./server.js), in order to improve
our [Sentry](https://athletifi.sentry.io) traces.

## Migrations

Once you have set up your AWS credentials and Postgres database in .env.local:
  - `yarn migrate up` to run all migrations that have not yet been run.
  - `yarn migrate down` to revert the last migration. Can be run multiple times.
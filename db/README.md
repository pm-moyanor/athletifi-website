# AthletiFi Schema

## Run migrations

1. Setup AWS authentication if you have not already.
   1. Create a user, e.g. `ethan-dev-actions`.
   2. Add that user to the `developer-actions` and `nextjs-cognito-auth` groups.
   3. Create an access key and login with the AWS CLI.
2. Setup `.env.local` if you have not already.
   1. Add `NEXT_AWS_PROFILE=<profile>` where `<profile>` is the name of your AWS
      profile in `~/.aws/configure`.
   2. Add `NEXT_PG_DATABASE=dev` where `<database>` is the name of the database
      in postgres. Use `dev` for development and testing.
3. Run migrations
   - `yarn migrate up` to run all migrations that have not yet been run.
   - `yarn migrate down` to revert the last migration. Can be run multiple times.
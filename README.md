# Node User Crud

Express API with User authentication APIs

Offering you a clean and MVC structured code with the best file structure. User Registrationa and Login API's are included with routes and mongoose schema.

# Packages Used

1. Mongoose
2. Express
3. Bcrypt
4. jsonwebtoken
5. Body Parser

# How can you get started?

Just clone the repo and run

    npm install

OR

    yarn install

# Environemnt Variables

Code uses environment variables so you can just create a file named as `nodemon.json` in the root directory and paste the below given code snippet.

```
{
  "env": {
    "PORT": <Port number on which you would like to run your server>,
    "MONGO_PORT": <Port number on which your mongodb server is running>,
    "JWT_PRIVATE_KEY": "Paste your JWT Private key",
    "ENCODING_ALGORITHM": "The encoding algorithm that you would like to use"
  }
}
```

You must change the above keys as per your own requirements.

And then run

`nodemon` or `npm start` or `yarn start`

If you find any issues then create an issue and open a PR against it.

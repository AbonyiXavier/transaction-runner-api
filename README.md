# Transaction Runner


[![Build Status](https://travis-ci.com/AbonyiXavier/transaction-runner-api.svg?branch=main)](https://travis-ci.com/AbonyiXavier/transaction-runner-api)

[![Coverage Status](https://coveralls.io/repos/github/AbonyiXavier/transaction-runner-api/badge.svg?branch=main)](https://coveralls.io/github/AbonyiXavier/transaction-runner-api?branch=main)


Transaction Runner allow users to create account, deposit money and transafer money to another users. It is built on top of NodeJS and Express. It is higly flexible because it provides users with opportunity to:

- Sign up
- Sign in
- Deposit money
- Send money 

# Getting Started

To obtain a copy of this app download or clone the repository at this [url](https://github.com/AbonyiXavier/transaction-runner-api)

Postman collection documentation link [url](https://documenter.getpostman.com/view/7775892/TzskFjDu)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- A REST API client(like POSTMAN) Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasn't cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm run dev' to start the application
- Run 'npm run test' to run test on the application
- In a browser address bar navigate to ''

# Using transaction runner API through a restful client

- Open any restful client application initially installed
- Select the appropriate http method. Either GET, POST,

### Signin

- Use the POST method
- Use this url https://trnx-runner.herokuapp.com/api/v1/login

### Signup

- Use the POST method
- Use this url https://trnx-runner.herokuapp.com/api/v1/signup
- As user get signup automatically the balance is 5000


### Deposit money

- Use the POST method (token is needed)
- Use this url https://trnx-runner.herokuapp.com/api/v1/accounts/deposit


### Transfer money

- Use the POST method
- Use this url https://trnx-runner.herokuapp.com/api/v1/accounts/transfer


- Use the GET method

- To get transactions (token is needed)
- Use this url https://trnx-runner.herokuapp.com/api/v1/transactions

- To get transactions by id (token is needed)
- Use this url https://trnx-runner.herokuapp.com/api/v1/transactions/5d7c487c-3960-42ef-91e2-2680249df28e


- To get accounts (token is needed)
- Use this url https://trnx-runner.herokuapp.com/api/v1/accounts

- To get accounts (token is needed)
- Use this url https://trnx-runner.herokuapp.com/api/v1/accounts/106a5b2c-8bdd-4f96-b0a9-08a5a3c48dc3


## Built With

- NodeJs
- Express
- Postgresql (database)
- Sequelize (ORM)
- Travis CI
- Coveralls
- Heroku

## Author

- AbonyiXavier

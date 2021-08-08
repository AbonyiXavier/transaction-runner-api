// import chai from 'chai';
// import chatHttp from 'chai-http';
// import 'chai/register-should';
// import app from '../app';

// chai.use(chatHttp);
// const { expect } = chai;

import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

chai.should();

chai.use(chaiHttp);

let token;
let recipient_id;

import {userOne, userTwo, fakeUser, inValidAccount } from './data'

describe('Testing for authentication endpoints:', () => {

  it('It should signup a user', async() => {
    const result = await chai.request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send(userOne)
    //   expect(result.status).to.equal(201);
    //   expect(result.body.message).to.be.equal('User created successfully!');
  });

//   it('It should not signup a user with duplicate details', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/signup')
//       .set('Accept', 'application/json')
//       .send(userOne)
//       expect(result.status).to.equal(409);
//       expect(result.body.message).to.be.equal('email already in use.');
//   });
  
  // Second create
//   it('It should create another user with the account', async() => {
    
//     const result = await chai.request(app)
//       .post('/api/v1/auth/users')
//       .set('Accept', 'application/json')
//       .send(userTwo)
//       expect(result.status).to.equal(201);
//       expect(result.body.message).to.be.equal('account creation was successful');
//       recipient_id = result.body.account_id;
//   });

//   it('It should not create a user with incomplete parameters', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/auth/users')
//       .set('Accept', 'application/json')
//       .send(fakeUser)
//       expect(result.status).to.equal(400);
//       expect(result.body.message).to.be.equal('username or password is missing');
//   });

//   it('It should generate token when user logs in', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/auth/login')
//       .set('Accept', 'application/json')
//       .send(userOne)
//       expect(result.status).to.equal(200);
//       expect(result.body).to.have.property('token');
//   });

//   it('It should generate token when user logs in', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/auth/login')
//       .set('Accept', 'application/json')
//       .send(userTwo)
//       expect(result.status).to.equal(200);
//       expect(result.body).to.have.property('token');
//       token = result.body.token;
//   });

//   it('It should throw an error when user attempts to log in with invalid details', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/auth/login')
//       .set('Accept', 'application/json')
//       .send(inValidAccount)
//       expect(result.status).to.equal(401);
//       expect(result.body).to.have.property('message');
//   });

//   it('It create transaction/transfer', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/transfers')
//       .set('Authorization', token)
//       .send({'recipient_id': recipient_id, 'amount': 1000})
//       expect(result.status).to.equal(200);
//       expect(result.body).to.have.property('message');
//   });

//   it('It should initiate deposit on an account', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/deposits')
//       .set('Authorization', token)
//       .send({'recipient_id': recipient_id, 'amount': 1000})
//       expect(result.status).to.equal(200);
//       expect(result.body).to.have.property('message');
//       expect(result.body.message).to.equal('deposit was successful')
//   });

//   it('It should throw an error when amount to be withdrawn from account is less than balance', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/withdrawals')
//       .set('Authorization', token)
//       .send({'amount': 500000000000})
//       expect(result.status).to.equal(400);
//       expect(result.body.success).to.be.false;
//       expect(result.body.error).to.equal('Insufficient balance')
//   });

//   it('It should initiate withdrawal on an account', async() => {
//     const result = await chai.request(app)
//       .post('/api/v1/withdrawals')
//       .set('Authorization', token)
//       .send({'amount': 2000})
//       expect(result.status).to.equal(200);
//       expect(result.body).to.have.property('message');
//       expect(result.body.message).to.equal('withdrawal was successful')
//   });
});
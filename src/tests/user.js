import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';

chai.use(chatHttp);
const { expect } = chai;


let token;
let account_number;
let id;

import {userOne, userThreeLogin, userOneLogin, userThree, fakeUser, inValidAccount } from './data'

describe('Testing for authentication endpoints:', () => {

  it('It should signup a user', async() => {
    const result = await chai.request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send(userOne)
      expect(result.status).to.equal(201);
      expect(result.body.message).to.be.equal('User created successfully!');
  });

  it('It should not signup a user with duplicate details', async() => {
    const result = await chai.request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send(userOne)
      expect(result.status).to.equal(400);
      expect(result.body.message).to.be.equal('email already in use.');
  });

    // Signup Second user 
    it('It should signup another user', async() => {
    
      const result = await chai.request(app)
        .post('/api/v1/signup')
        .set('Accept', 'application/json')
        .send(userThree)
        expect(result.status).to.equal(201);
        expect(result.body.message).to.be.equal('User created successfully!');
        account_number = result.body.data.account_number;
    });
  
    it('It should generate token when user logs in', async() => {
      const result = await chai.request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(userOneLogin)
        expect(result.status).to.equal(200);
        expect(result.body.data).to.have.property('token');
    });
  
    it('It should generate token when user logs in', async() => {
      const result = await chai.request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(userThreeLogin)
        expect(result.status).to.equal(200);
        expect(result.body.data).to.have.property('token');
        token = result.body.data.token;
    });

    it('It should throw an error when user attempts to log in with invalid credentials', async() => {
      const result = await chai.request(app)
        .post('/api/v1/login')
        .set('Accept', 'application/json')
        .send(inValidAccount)
        expect(result.status).to.equal(400);
        expect(result.body).to.have.property('message');
    });
    
    
    it('It should deposit money to his/her account', async() => {
      const result = await chai.request(app)
        .post('/api/v1/accounts/deposit')
        .set('Authorization', token)
        .send({'amount': 1000})
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('message');
        expect(result.body.message).to.equal('deposit successfully')
    });

    it('It create transfer of money', async() => {
      const result = await chai.request(app)
        .post('/api/v1/accounts/transfer')
        .set('Authorization', token)
        .send({'account_number': account_number, 'amount': 1000})
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('message');
    });
    it('It should display user account details', async() => {
      const result = await chai.request(app)
        .get('/api/v1/accounts')
        .set('Authorization', token)
        expect(result.status).to.equal(200);
        expect(result.body).to.have.property('message');
    });
  
});
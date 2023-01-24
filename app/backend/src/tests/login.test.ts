import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {
  afterEach(sinon.restore);

  const user = {
    email: 'user@user.com',
    password: 'secret_user'
  }

  it('Retorna status 400 caso email não seja informada', async () => {
    const result = await chai.request(app).post('/login').send({ ...user, email: undefined })

    chai.expect(result.status).to.equal(400)
  })

  it('Retorna status 400 caso senha não seja informada', async () => {
    const result = await chai.request(app).post('/login').send({ ...user, password: undefined })

    chai.expect(result.status).to.equal(400)
    // chai.expect(result.body).to.equal({ message: 'All fields must be filled' })
  })

  it('Retorna status 401 caso email não seja encontrado no banco de dados', async () => {
    const result = await chai.request(app).post('/login').send({ ...user, email: 'emailinvalido@email.com' })

    expect(result.status).to.equal(401)
  })

  it('Retorna status 401 caso senha não seja encontrada no banco de dados', async () => {
    const result = await chai.request(app).post('/login').send({ ...user, password: 'hdfshfdslsç' })

    expect(result.status).to.equal(401)
  })
})
const request = require('supertest')('https://reqres.in');
const { expect } = require('chai');

let response = '';
let userId = '';

describe('reqres API test', function () {
  // users endpoint
  describe('users endpoint', function () {
    // GET Requests
    describe('GET', function () {
      context('List Check', function () {
        context('Valid Tests', function () {
          before(async function () {
            response = await request.get('/api/users?page=2');
          });
          it('Status Code is 200', function () {
            expect(response.status).to.eql(200);
          });
          it('Data Length is 6', function () {
            expect(response.body.data.length).to.eql(6);
          });
        });
        // Add any invalid test here for List Check
      });
      context('Single Check', function () {
        context('Valid Tests', function () {
          before(async function () {
            response = await request.get('/api/users/2');
          });
          it('Status Code is 200', function () {
            expect(response.status).to.eql(200);
          });
          it('Data Length is 5', function () {
            expect(Object.keys(response.body.data).length).to.eql(5);
          });
        });
        context('Invalid Tests', function () {
          before(async function () {
            response = await request.get('/api/users/23');
          });
          it('Status Code is 404', function () {
            expect(response.status).to.eql(404);
          });
          it('Response Body is empty', function () {
            expect(Object.keys(response.body).length).to.eql(0);
          });
        });
      });
      context('Delayed Response', function () {
        // Increase timeout from default 2000ms in Mocha to new value
        this.timeout(3500);
        context('Valid Tests', function () {
          before(async function () {
            response = await request.get('/api/users?delay=3');
          });
          it('Status Code is 200', function () {
            expect(response.status).to.eql(200);
          });
        });
      });
    });

    // POST Requests
    describe('POST', function () {
      context('Valid Tests', function () {
        before(async function () {
          response = await request.post('/api/users').send({ name: 'morpheus', job: 'leader' });
        });
        it('Status Code is 201', function () {
          expect(response.status).to.eql(201);
          userId = response.body.id;
        });
      });
    });

    // PUT Requests
    describe('PUT', function () {
      context('Valid Tests', function () {
        before(async function () {
          response = await request.put(`/api/users/${userId}`).send({ name: 'morpheus', job: 'zion resident' });
        });
        it('Status Code is 200', function () {
          expect(response.status).to.eql(200);
        });
      });
    });

    // PATCH Requests
    describe('PATCH', function () {
      context('Valid Tests', function () {
        before(async function () {
          response = await request.patch('/api/users/2').send({ name: 'morpheus', job: 'zion resident' });
        });
        it('Status Code is 200', function () {
          expect(response.status).to.eql(200);
        });
      });
    });

    // DELETE Requests
    describe('DELETE', function () {
      context('Valid Tests', function () {
        before(async function () {
          response = await request.delete('/api/users/2');
        });
        it('Status Code is 204', function () {
          expect(response.status).to.eql(204);
        });
      });
    });
  });

  // resources endpoint
  describe('resources endpoint', function () {
    // GET Requests
    describe('GET', function () {
      context('List Check', function () {
        context('Valid Tests', function () {
          before(async function () {
            response = await request.get('/api/unknown');
          });
          it('Status Code is 200', function () {
            expect(response.status).to.eql(200);
          });
          it('Data Length is 6', function () {
            expect(response.body.data.length).to.eql(6);
          });
        });
        // Add any invalid test here for List Check
      });
      context('Single Check', function () {
        context('Valid Tests', function () {
          before(async function () {
            response = await request.get('/api/uknown/2');
          });
          it('Status Code is 200', function () {
            expect(response.status).to.eql(200);
          });
        });
        context('Invalid Tests', function () {
          before(async function () {
            response = await request.get('/api/unknown/23');
          });
          it('Status Code is 404', function () {
            expect(response.status).to.eql(404);
          });
          it('Response Body is empty', function () {
            expect(Object.keys(response.body).length).to.eql(0);
          });
        });
      });
    });
  });

  // registration endpoint
  describe('registration endpoint', function () {
    // POST Requests
    describe('POST', function () {
      context('Valid Tests', function () {
        before(async function () {
          response = await request.post('/api/register').send({ email: 'eve.holt@reqres.in', password: 'psitol' });
        });
        it('Status Code is 200', function () {
          expect(response.status).to.eql(200);
        });
        it('Response Body has property id', function () {
          expect(response.body).to.have.own.property('id');
        });
        it('Response Body has property token', function () {
          expect(response.body).to.have.own.property('token');
        });
      });
      context('Invalid Tests', function () {
        before(async function () {
          response = await request.post('/api/register').send({ email: 'sydney@fife' });
        });
        it('Status Code is 400', function () {
          expect(response.status).to.eql(400);
        });
        it('Response Body has property error', function () {
          expect(response.body).to.have.own.property('error');
        });
      });
    });
  });

  // login endpoint
  describe('login endpoint', function () {
    // POST Requests
    describe('POST', function () {
      context('Valid Tests', function () {
        before(async function () {
          response = await request.post('/api/login').send({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
        });
        it('Status Code is 200', function () {
          expect(response.status).to.eql(200);
        });
        it('Response Body has property token', function () {
          expect(response.body).to.have.own.property('token');
        });
      });
      context('Invalid Tests', function () {
        before(async function () {
          response = await request.post('/api/login').send({ email: 'peter@klaven' });
        });
        it('Status Code is 400', function () {
          expect(response.status).to.eql(400);
        });
        it('Response Body has property error', function () {
          expect(response.body).to.have.own.property('error');
        });
      });
    });
  });
});

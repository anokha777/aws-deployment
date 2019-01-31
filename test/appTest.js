const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-expressions: 0 */
describe('Testing app...', () => {
  let loginToken = '';
  it('should login at /login POST', (done) => {
    chai.request(server)
      .post('/user/login')
      .set({ 'Content-type': 'application/json' })
      .send({ username: 'aaa', password: '111' })
      .end((err, res) => {
        loginToken = res.body.token;
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('token');
        res.body.message.should.equal('Auth successful');
        done();
      });
  });

  it('should list ALL all notes', (done) => {
    chai.request(server)
      .get('/api/note')
      .set('authorization', `Bearer ${loginToken}`)
      .set({ 'Content-type': 'application/json' })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should add a note /api/note POST', (done) => {
    chai.request(server)
      .post('/api/note')
      .set('authorization', `Bearer ${loginToken}`)
      .set({ 'Content-type': 'application/json' })
      .send({ notetitle: `by testing ${loginToken.substr(loginToken.length - 8)}`, notedescription: 'description by testing' })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        done();
      });
  });

  it('should update a note on /api/note/<id> PUT', (done) => {
    chai.request(server)
      .get('/api/note')
      .set('authorization', `Bearer ${loginToken}`)
      .set({ 'Content-type': 'application/json' })
      .end((err, res) => {
        chai.request(server)
          .put(`/api/note/${res.body.notes[0]._id}`)
          .set('authorization', `Bearer ${loginToken}`)
          .set({ 'Content-type': 'application/json' })
          .send({ notetitle: 'trello note title new updated-777', notedescription: 'trello note description updated' })
          .end((error, response) => {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('message');
            response.body.message.should.equal('Update successful!');
            done();
          });
      });
  });
});

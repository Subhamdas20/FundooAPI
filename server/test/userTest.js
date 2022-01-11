const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const rawdata = fs.readFileSync('test/userData.json');
const employeeJSON = JSON.parse(rawdata);
// let jwToken = '';

// Test cases for Registration
describe('registration API', () => {
    it('if valid details sent should save in db', (done) => {
        const userDetails = employeeJSON.UserData1;

        chai.request(server)
            .post('/register')
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    done();
                }
                res.should.have.status(200);
                done();
            });
    })
    it('if invalid emailId sent should not save in db', (done) => {
        const userDetails = employeeJSON.UserData2;

        chai.request(server)
            .post('/register')
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    done();
                }
                res.should.have.status(403);
                res.body[0].should.have.property('msg').equal('Email is not valid')
                done();

            });
    })
    it('if already registered email sent should not save in db', (done) => {
        const userDetails = employeeJSON.UserData3;

        chai.request(server)
            .post('/register')
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    done();
                }
                res.should.have.status(200);
                res.body.should.have.property('message').equal("user already exists");
                done();
            });
    }),
        it('if invalid firstname sent should not save in db', (done) => {
            const userDetails = employeeJSON.UserData4;

            chai.request(server)
                .post('/register')
                .send(userDetails)
                .end((err, res) => {
                    if (err) {
                        done();
                    }
                    res.should.have.status(403);
                    res.body[0].should.have.property('msg').equal('Min 2 alphabet required in FirstName');
                    done();
                });
        }),
        it('if invalid lastname sent should not save in db', (done) => {
            const userDetails = employeeJSON.UserData5;

            chai.request(server)
                .post('/register')
                .send(userDetails)
                .end((err, res) => {
                    if (err) {
                        done();
                    }
                    res.should.have.status(403);
                    res.body[0].should.have.property('msg').equal('Min 2 alphabet required in LastName');
                    done();
                });
        })
})

describe('login API', () => {
    it('if valid details sent should login', (done) => {
        const userDetails = employeeJSON.LoginData1;
        chai.request(server)
            .post('/login')
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    done();
                }
                res.should.have.status(200);
                res.body.should.have.property('message').equal('Login success');
                done();
            });
    }),
        it('if wrong email send should not login', (done) => {
            const userDetails = employeeJSON.LoginData2;
            chai.request(server)
                .post('/login')
                .send(userDetails)
                .end((err, res) => {
                    if (err) {
                        done();
                    }
                    res.should.have.status(403);
                    res.body.should.have.property('message').equal('user not found please register first');
                    done();
                });
        }),
        it('if wrong password send should not login', (done) => {
            const userDetails = employeeJSON.LoginData3;
            chai.request(server)
                .post('/login')
                .send(userDetails)
                .end((err, res) => {
                    if (err) {
                        done();
                    }
                    res.should.have.status(403);
                    res.body.should.have.property('message').equal('invalid password');
                    done();
                });
        })
})
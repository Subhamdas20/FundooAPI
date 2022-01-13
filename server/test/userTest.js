const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

const rawdata = fs.readFileSync('test/userData.json');
const employeeJSON = JSON.parse(rawdata);
var jwToken = '';


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
                res.should.have.status(201);
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
                res.should.have.status(404);
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
                res.should.have.status(201);
                res.body.should.have.property('message').equal('user already exists')
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
                    res.should.have.status(404);
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
                    res.should.have.status(404);
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
                res.should.have.status(202);
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
                    res.should.have.status(404);
                    res.body[0].msg.should.equal('Email is not valid');
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
                    res.should.have.status(404);
                    res.body.should.have.property('message').equal('invalid password');
                    done();
                });
        })
})
describe('forget API', () => {
    it('if valid email sent should send mail', (done) => {
        const userDetails = employeeJSON.forgetData1;
        chai.request(server)
            .post('/forgetpassword')
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    done();
                }
                res.should.have.status(200);
                res.body.should.have.property('message').equal('Email sent');
                done();
            });
    }),
        it('if unregistered email recieved should not send mail', (done) => {
            const userDetails = employeeJSON.forgetData2;
            chai.request(server)
                .post('/forgetpassword')
                .send(userDetails)
                .end((err, res) => {
                    if (err) {
                        done();
                    }
                    
                    res.body.should.have.property('message').equal('user not found please register first');
                    done();
                });
        })
    it('if invalid email received should not send mail', (done) => {
        const userDetails = employeeJSON.forgetData3;
        chai.request(server)
            .post('/forgetpassword')
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    done();
                }
                res.should.have.status(404);

                done();
            });
    })

})
describe('resetPassword API', () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post('/login')
            .send(employeeJSON.LoginData1)
            .end((_err, res) => {
                jwToken = res.body.data.token;
                res.should.have.status(202);
                done();
            });
    });

    it('if valid token sent and valid password sent should update in db', (done) => {

        const userDetails = employeeJSON.resetData1;
        chai.request(server)
            .post('/resetpassword')
            .set({ token: jwToken })
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(200);

                done();
            });
    })

    it('if invalid token sent then status code should be 401', (done) => {

        const userDetails = employeeJSON.resetData1;
        chai.request(server)
            .post('/resetpassword')
            .set({ token: "esf.esg.gs" })
            .send(userDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(401);

                done();
            });
    })
})
describe('addNotes API', () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post('/login')
            .send(employeeJSON.LoginData1)
            .end((_err, res) => {
                jwToken = res.body.data.token;
                res.should.have.status(202);
                done();
            });
    });

    it('if valid token sent then notes should be added in db', (done) => {

        const noteDetails = employeeJSON.addNotesData1;
        chai.request(server)
            .post('/addNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(202);
                done();
            });
    })
    it('if invalid token then status code should be 401', (done) => {
        const noteDetails = employeeJSON.addNotesData1;
        chai.request(server)
            .post('/addNote')
            .set({ token: "eafae.eaf.eag" })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(401);
                res.body.should.have.property('message').equal('Not authenticated');
                done();
            });
    })
    it('if invalid note  sent should not be add to db', (done) => {

        const noteDetails = employeeJSON.addNotesData2;
        chai.request(server)
            .post('/addNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(403);
                done();
            });
    })
    it('if invalid note title sent should not be add to db', (done) => {

        const noteDetails = employeeJSON.addNotesData2;
        chai.request(server)
            .post('/addNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(403);
                res.body.should.be.a('array');
                res.body[0].should.have.property('msg')
                res.body[0].msg.should.equal('title must be 2 characters long');
                done();
            });
    })
    it('if invalid note description sent should not be add to db', (done) => {

        const noteDetails = employeeJSON.addNotesData3;
        chai.request(server)
            .post('/addNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(403);
                res.body.should.be.a('array');
                res.body[0].should.have.property('msg')
                res.body[0].msg.should.equal('description must be 2 characters long');
                done();
            });
    })
    it('if invalid isPinned Data sent should not be add to db', (done) => {

        const noteDetails = employeeJSON.addNotesData4;
        chai.request(server)
            .post('/addNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(403);
                res.body.should.be.a('array');
                res.body[0].should.have.property('msg')
                res.body[0].msg.should.equal('isPinned must be 2 characters long');
                done();
            });
    })
    it('if invalid isArchieved Data sent should not be add to db', (done) => {

        const noteDetails = employeeJSON.addNotesData5;
        chai.request(server)
            .post('/addNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(403);
                res.body.should.be.a('array');
                res.body[0].should.have.property('msg')
                res.body[0].msg.should.equal('isArchieved Must be a boolean true or false');
                done();
            });
    })
    it('if invalid isDeleted Data sent should not be add to db', (done) => {

        const noteDetails = employeeJSON.addNotesData6;
        chai.request(server)
            .post('/addNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(403);
                res.body.should.be.a('array');
                res.body[0].should.have.property('msg')
                res.body[0].msg.should.equal('isDeleted Must be a boolean true or false');
                done();
            });
    })
})
describe('getNotes API', () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post('/login')
            .send(employeeJSON.LoginData1)
            .end((_err, res) => {
                jwToken = res.body.data.token;
                res.should.have.status(202);
                done();
            });
    });

    it('if valid token sent then get notes should give status code 200', (done) => {
        const noteDetails = employeeJSON.getNotes;
        chai.request(server)
            .get('/getNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(200);
                done();
            });
    })

    it('if invalid valid token sent then getnotes should give status code 401', (done) => {
        const noteDetails = employeeJSON.getNotes;
        chai.request(server)
            .get('/getNote')
            .set({ token: "wsegs.aef.aegf" })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(401);
                done();
            });
    })
})

describe('updateNotes API', () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post('/login')
            .send(employeeJSON.LoginData1)
            .end((_err, res) => {
                jwToken = res.body.data.token;
                res.should.have.status(202);
                done();
            });
    });

    it('if valid token sent then notes should be updated', (done) => {
        const noteDetails = employeeJSON.updateNotes;
        chai.request(server)
            .put('/updateNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(200);
                done();
            });
    })
    it('if invalid  token sent then notes should not be updated', (done) => {
        const noteDetails = employeeJSON.updateNotes;
        chai.request(server)
            .put('/updateNote')
            .set({ token: "aef.aef.eaf" })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(401);
                done();
            });
    })
    it('if valid  token sent and invalid _ID sent then notes should not be updated', (done) => {
        const noteDetails = employeeJSON.updateNotes2;
        chai.request(server)
            .put('/updateNote')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(400);
                done();
            });
    })
})
describe('isArchieved API', () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post('/login')
            .send(employeeJSON.LoginData1)
            .end((_err, res) => {
                jwToken = res.body.data.token;
                res.should.have.status(202);
                done();
            });
    });

    it('if valid token sent we get status code 202 in isArchievd notes', (done) => {
        const noteDetails = "";
        chai.request(server)
            .get('/isArchieved')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(200);
                done();
            });
    })
    it('if invalid token sent we get status code 401 in isArchievd notes', (done) => {
        const noteDetails = "";
        chai.request(server)
            .get('/isArchieved')
            .set({ token: "aesdf.efaeg.aef" })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(401);
                done();
            });
    })
})

describe('isDeleted API', () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post('/login')
            .send(employeeJSON.LoginData1)
            .end((_err, res) => {
                jwToken = res.body.data.token;
                res.should.have.status(202);
                done();
            });
    });

    it('if valid token sent we get status code 200 in isDeleted notes', (done) => {
        const noteDetails = "";
        chai.request(server)
            .get('/isDeleted')
            .set({ token: jwToken })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(200);
                done();
            });
    })
    it('if invalid token sent we get status code 401 in isDeleted notes', (done) => {
        const noteDetails = "";
        chai.request(server)
            .get('/isDeleted')
            .set({ token: "efa.aef.aef" })
            .send(noteDetails)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    done();
                }
                res.should.have.status(401);
                done();
            });
    })
})
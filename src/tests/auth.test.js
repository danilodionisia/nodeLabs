const expect = require('chai').expect;
const validateAuthParameters = require('../app/helpers/userFieldsValidation');

describe('Validate name parameter', () => {

    it('Name is null - return true', (done) => {
        const name = null;
        const result = validateAuthParameters.validateName(name);
        expect(result.isEmpty).be.equal(true);
        done();
    });

    it('Name is OK - return false', (done) => {
        const name = 'Johnn';
        const result = validateAuthParameters.validateName(name);
        expect(result.isEmpty).be.equal(false);
        done();
    });

    it('Name is too short - return true', (done) => {
        const name = 'J';
        const result = validateAuthParameters.validateName(name);
        expect(result.isInvalidLength).be.equal(true);
        done();
    });

    it('Name is not too short - return false', (done) => {
        const name = 'Johnn';
        const result = validateAuthParameters.validateName(name);
        expect(result.isInvalidLength).be.equal(false);
        done();
    });

    it('Name is not correct (numbers) - return true', (done) => {
        const name = 1212;
        const result = validateAuthParameters.validateName(name);
        expect(result.isIncorrect).be.equal(true);
        done();
    });

    it('Name is correct (not numbers) - return false', (done) => {
        const name = 'Johnn';
        const result = validateAuthParameters.validateName(name);
        expect(result.isIncorrect).be.equal(false);
        done();
    });

});


describe('Validate email parameter', () => {

    it('Email is null - return true', (done) => {
        const email = null;
        const result = validateAuthParameters.validateEmail(email);
        expect(result.isEmpty).be.equal(true);
        done();
    });

    it('Email is empty - return true', (done) => {
        const email = '';
        const result = validateAuthParameters.validateEmail(email);
        expect(result.isEmpty).be.equal(true);
        done();
    });

    it('Email is OK - return false', (done) => {
        const email = 'johnn@gmail.com';
        const result = validateAuthParameters.validateEmail(email);
        expect(result.isEmpty).be.equal(false);
        done();
    });

    it('Email without @ (at) - return true', (done) => {
        const email = 'johnn.gmail.com';
        const result = validateAuthParameters.validateEmail(email);
        expect(result.isIncorrect).be.equal(true);
        done();
    });

    it('Email without . (dot) - return true', (done) => {
        const email = 'johnn@gmail';
        const result = validateAuthParameters.validateEmail(email);
        expect(result.isIncorrect).be.equal(true);
        done();
    });

    it('Email OK - return false', (done) => {
        const email = 'johnn@gmail.com';
        const result = validateAuthParameters.validateEmail(email);
        expect(result.isIncorrect).be.equal(false);
        done();
    });

});



describe('Validate password parameter', () => {

    it('Password is null - return true', (done) => {
        const password = null;
        const result = validateAuthParameters.validatePassword(password);
        expect(result.isEmpty).be.equal(true);
        done();
    });

    it('Password is empty - return true', (done) => {
        const password = '';
        const result = validateAuthParameters.validatePassword(password);
        expect(result.isEmpty).be.equal(true);
        done();
    });

    it('Password is OK - return false', (done) => {
        const password = 'senha123@';
        const result = validateAuthParameters.validatePassword(password);
        expect(result.isEmpty).be.equal(false);
        done();
    });

    it('Password is too short - return true', (done) => {
        const password = 'senha';
        const result = validateAuthParameters.validatePassword(password);
        expect(result.isInvalidLength).be.equal(true);
        done();
    });

    it('Password has no special characters or numbers - return true', (done) => {
        const password = 'senhaaa';
        const result = validateAuthParameters.validatePassword(password);
        expect(result.isIncorrect).be.equal(true);
        done();
    });

    it('Password has only special characters - return true', (done) => {
        const password = 'senhaaa@';
        const result = validateAuthParameters.validatePassword(password);
        expect(result.isIncorrect).be.equal(true);
        done();
    });

    it('Password has only special numbers - return true', (done) => {
        const password = 'senhaaa1';
        const result = validateAuthParameters.validatePassword(password);
        expect(result.isIncorrect).be.equal(true);
        done();
    });

});
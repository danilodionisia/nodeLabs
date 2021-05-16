const expect = require('chai').expect;
const validateTocicolyParameters = require('../../src/app/helpers/toxicologicsFieldsValidation');

let reqExample = {
    codigo_amostra: 22343312,
    Cocaina: 0.5,
    Anfetamina: 0.19,
    Metanfetamina: 0.19,
    MDA: 0.19,
    MDMA: 0.19,
    THC: 0.049,
    Morfina: 0.19,
    Codeina: 0.19,
    Heroina: 0.19,
    Benzoilecgonina: 0.05,
    Cocaetileno: 0.05,
    Norcocaina: 0.05
};

let reqExampleMissing = {
    codigo_amostra: 22343312,
    Cocaina: 0.5,
    Anfetamina: 0.19,
    Metanfetamina: 0.19,
    MDA: 0.19,
    MDMA: 0.19,
    THC: 0.049,
    Morfina: 0.19,
    Codeina: 0.19,
    Heroina: 0.19,
    Benzoilecgonina: 0.05,
    Cocaetileno: 0.05
};

describe('Validate Sample requisition', () => {
    
    it('Validate the length of all parameters - return false', (done) => {
        reqExample.Norcocaina = 0.02020202020202;
        const result = validateTocicolyParameters.validateFields(reqExample);
        expect(result).be.equal(false);
        done();
    });

    it('Validate parameters if all mandatory parameters were received - return false', (done) => {
        const result = validateTocicolyParameters.mandatoryFieldsValidate(reqExample);
        expect(result.isError).be.equal(false);
        done();
    });

    it('Validate parameters if all mandatory parameters were received - return true', (done) => {
        delete reqExample.Norcocaina;
        const result = validateTocicolyParameters.mandatoryFieldsValidate(reqExample);
        expect(result.isError).be.equal(true);
        done();
    });

    it('Validate parameters if all mandatory parameters were received - return "Fill all mandatory fields"', (done) => {
        delete reqExample.Norcocaina;
        const respText = "Fill all mandatory fields";
        const result = validateTocicolyParameters.mandatoryFieldsValidate(reqExample);
        expect(result.errorMessage).be.equal(respText);
        done();
    });

    it('Validate parameters if all mandatory parameters were received - return false', (done) => { 
        const result = validateTocicolyParameters.paramsValidate(reqExampleMissing);
        expect(result.isError).be.equal(false);
        done();
    });

    it('Validate the result of the sample - return "negative"', (done) => {
        const resText = 'negative';
        const result = validateTocicolyParameters.validateValues(reqExample);
        expect(result.sample_result).be.equal(resText);
        done();
    });

    it('Validate the result of the sample - return "positive"', (done) => {
        const resText = 'positive';
        reqExample.THC = 1;
        const result = validateTocicolyParameters.validateValues(reqExample);
        expect(result.sample_result).be.equal(resText);
        done();
    });

});


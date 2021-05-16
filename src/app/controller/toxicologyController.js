const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const fieldsValidation = require('../helpers/toxicologicsFieldsValidation');
const ERROR = require('../../config/errors');

router.use(authMiddleware)

const Toxicologic = require('../models/toxicologic');

router.get('/', async (req, res) => {

    try {
        let toxicologics = await Toxicologic.find();
        toxicologics = fieldsValidation.cleanResponseSome(toxicologics);
        return res.status(200).json(toxicologics);
    } catch (err) {
        console.error(err);
        return res.status(500).json(ERROR.ERROR_LOADING_TOXIC);
    }

});

router.get('/:codigo_amostra', async (req, res) => {

    try {
        let toxicologic = await Toxicologic.findOne({ CodigoAmostra: req.params.codigo_amostra });
        
        if (!toxicologic) {
            return res.status(400).json(ERROR.NOT_FOUND);
        }

        toxicologic = fieldsValidation.cleanResponseOnlyOne(toxicologic);
        return res.status(200).json(toxicologic);
    } catch (err) {
        console.error(err);
        return res.status(500).json(ERROR.ERROR_LOADING_TOXIC);
    }

});

router.post('/', async (req, res) => {

    try {
        const minNumberOfKeys = 1;
        
        if (Object.keys(req.body).length < minNumberOfKeys) {
            return res.status(400).json(ERROR.ERROR_ALL_PARAMETERS);
        }

        const thereAreMandatoryFields = fieldsValidation.mandatoryFieldsValidate(req.body);
        
        if (thereAreMandatoryFields.isError) {
            return res.status(400).json({ error: thereAreMandatoryFields.errorMessage });
        }

        const isParamatersValid = fieldsValidation.paramsValidate(req.body);
        
        if (isParamatersValid.isError) {
            return res.status(400).json({ error: isParamatersValid.errorMessage });
        } 

        
        const getParamsResult = fieldsValidation.validateValues(req.body);
        req.body.Result = getParamsResult.sample_result;
        const paramsReadyToInsert = fieldsValidation.prepareFiledsToInsert(req.body);
        
        if (await Toxicologic.findOne({ CodigoAmostra: paramsReadyToInsert.CodigoAmostra })){
            return res.status(400).json(ERROR.ERROR_SAMPLE_ALREADY_EXISTS);
        }

        await Toxicologic.create(paramsReadyToInsert);

        return res.status(200).json(
            {
                codigo_amostra: getParamsResult.sample_code,
                resultado_amostra: getParamsResult.sample_result
            });

    } catch (err) {
        console.error(err)
        return res.status(500).json(ERROR.ERROR_SAVING_SAMPLE);
    }

});

router.put('/:codigo_amostra', async (req, res) => {

    try {

        const minNumberOfKeys = 1;
        
        if (Object.keys(req.body).length < minNumberOfKeys) {
            return res.status(400).json(ERROR.ERROR_ALL_PARAMETERS);
        }

        const thereAreMandatoryFields = fieldsValidation.mandatoryFieldsValidate(req.body);
        
        if (thereAreMandatoryFields.isError) {
            return res.status(400).json({ error: thereAreMandatoryFields.errorMessage });
        }

        const isParamatersValid = fieldsValidation.paramsValidate(req.body);
        
        if (isParamatersValid.isError) {
            return res.status(400).json({ error: isParamatersValid.errorMessage });
        } 

        
        const getParamsResult = fieldsValidation.validateValues(req.body);
        req.body.Result = getParamsResult.sample_result;
        const paramsReadyToInsert = fieldsValidation.prepareFiledsToInsert(req.body);
        
        const updatedSample = await Toxicologic.findOne({ CodigoAmostra: req.params.codigo_amostra });

        if (!updatedSample) {
            return res.status(400).json(ERROR.NOT_FOUND);
        }

        updatedSample.overwrite(paramsReadyToInsert);
        await updatedSample.save();

        return res.status(200).json({
            codigo_amostra: getParamsResult.sample_code,
            resultado_amostra: getParamsResult.sample_result
         });
    } catch (err) {
        console.error(err)
        return res.status(500).json(ERROR.ERROR_UPDATE_SAMPLE);
    }

});

router.delete('/:codigo_amostra', async (req, res) => {

    try {
        
        if (!req.params.codigo_amostra || req.params.codigo_amostra == undefined) {
            return res.status(400).json(ERROR.ERROR_INVALID_SAMPLE_CODE);
        }



        const removedSample = await Toxicologic.deleteOne({ CodigoAmostra: req.params.codigo_amostra });
        
        if (removedSample.n > 0) {
            return res.status(200).json({codigo_amostra: req.params.codigo_amostra, status: 'removed'});
        } else {
            return res.status(400).json(ERROR.NOT_FOUND);
        }
        
    } catch (err) {
        console.error(err);
        return res.status(500).json(ERROR.ERROR_DELETING_SAMPLE);
    }

});







module.exports = app => app.use('/toxicologicals', router);
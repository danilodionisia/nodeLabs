const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const fieldsValidation = require('../helpers/toxicologicsFieldsValidation');

router.use(authMiddleware)

const Toxicologic = require('../models/toxicologic');

router.get('/', async (req, res) => {

    try {
        const toxicologics = await Toxicologic.find();
        const cleanResponse = fieldsValidation.cleanResponse(toxicologics);
        return res.status(200).json(cleanResponse);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error loading toxicologics' });
    }

});

router.get('/:toxicologicId', async (req, res) => {

    try {
        const toxicologic = await Toxicologic.findOne({ CodigoAmostra: req.params.toxicologicId });        
        return res.status(200).json(toxicologic);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error loading toxicologic' });
    }

});

router.post('/', async (req, res) => {

    try {
        const minNumberOfKeys = 1;
        
        if (Object.keys(req.body).length < minNumberOfKeys) {
            return res.status(400).json({ error: 'All parameters are needed' });
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
            return res.status(400).json({error: 'This sample already existts'});
        }

        await Toxicologic.create(paramsReadyToInsert);

        return res.status(200).json(
            {
                codigo_amostra: getParamsResult.sample_code,
                resultado_amostra: getParamsResult.sample_result
            });

    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error saving new sample' });
    }

});

router.put('/:toxicologicId', async (req, res) => {

    try {

        const minNumberOfKeys = 1;
        
        if (Object.keys(req.body).length < minNumberOfKeys) {
            return res.status(400).json({ error: 'All parameters are needed' });
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
        
        const updatedSample = await Toxicologic.findOne({ CodigoAmostra: req.params.toxicologicId });
        updatedSample.overwrite(paramsReadyToInsert);
        await updatedSample.save();

        console.log(updatedSample)

        return res.status(200).json({
            codigo_amostra: getParamsResult.sample_code,
            resultado_amostra: getParamsResult.sample_result
         });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error updating sample'});
    }

});

router.delete('/:toxicologicId', async (req, res) => {

    try {
        
        if (!req.params.toxicologicId || req.params.toxicologicId == undefined) {
            return res.status(400).json({ error: 'Codigo_amostra invalid' });
        }

        const removedSample = await Toxicologic.findByIdAndRemove(req.params.toxicologicId);
        
        if (removedSample) {
            return res.status(200).json({codigo_amostra: req.params.toxicologicId, status: 'removed'});
        } else {
            return res.status(400).json({status: 'Not found'});
        }
        
    } catch (err) {
        return res.status(500).json({ error: 'Error deleting project' });
    }

});







module.exports = app => app.use('/toxicologicals', router);
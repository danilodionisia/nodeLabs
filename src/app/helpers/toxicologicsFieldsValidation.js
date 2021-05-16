const mandatoryFields = [
    'codigo_amostra',
    'Cocaina',
    'Anfetamina',
    'Metanfetamina',
    'MDA',
    'MDMA',
    'THC',
    'Morfina',
    'Codeina',
    'Heroina',
    'Benzoilecgonina',
    'Cocaetileno',
    'Norcocaina'
];

exports.validateFields = (field) => {
    
    let response = true;
    const maxLength = 8;
    
    if (!field || field == undefined || field.length > maxLength || !isFinite(field) || Number(field) < 0) {
        response = false;
    }
    return response;
};

exports.mandatoryFieldsValidate = (params) => {

    const paramKeys = Object.keys(params);
    const minCountmandatoryFields = mandatoryFields.length;
    let response = {
        errorMessage: null,
        isError: false
    };

    if (paramKeys.length < mandatoryFields.length) {
        
        response.errorMessage = `Fill all mandatory fields`;
        response.isError = true;

    } else {

        for (let x = 0; x < mandatoryFields.length; x++) {
            const index = mandatoryFields.indexOf(paramKeys[x]);
            if (index < 0) {
                response.errorMessage = `This field ${paramKeys[x]} does not exists`;
                response.isError = true;
            }            
        }        
    }

   
    return response;
};

exports.paramsValidate = (params) => {

    const paramKeys = Object.keys(params);
    const paramValues = Object.values(params);
    let response = {
        errorMessage: null,
        isError: false
    };

    for (let x = 0; x < paramKeys.length; x++){
        if (!exports.validateFields(paramValues[x])) {
            response.errorMessage = `Fill the field ${paramKeys[x]} correctly`;
            response.isError = true;
            break;
        }
    }
    return response;    
}

const maxValuesOfOthersparameters = {
    'Cocaina': 0.5,
    'Anfetamina': 0.2,
    'Metanfetamina': 0.2,
    'MDA': 0.2,
    'MDMA': 0.2,
    'THC': 0.05,
    'Morfina': 0.2,
    'Codeina': 0.2,
    'Heroina': 0.2
};

const maxValuesToCocaineParameter = {
    'Cocaina': 0.5,
    'Benzoilecgonina': 0.05,
    'Cocaetileno': 0.05,
    'Norcocaina': 0.05
};

exports.validateValues = (params) => {
    
    let response = {
        sample_result: 'negative',
        sample_code: params.codigo_amostra
    };

    const resPositive = 'positive';

    //Cocaína,além da estar acima da nota de corte a concentração de um desses três: 
    //Benzoilecgonina, Cocaetileno ou Norcocaína deve ser no mínimo de 0.05.
    if (Number(params.Anfetamina) >= Number(maxValuesOfOthersparameters.Anfetamina)) {
        response.sample_result = resPositive;
        return response;
    }

    if (Number(params.Metanfetamina) >= Number(maxValuesOfOthersparameters.Metanfetamina)) {
        response.sample_result = resPositive;
        return response;
    }

    if (Number(params.MDA) >= Number(maxValuesOfOthersparameters.MDA)) {
        response.sample_result = resPositive;
        return response;
    }

    if (Number(params.MDMA) >= Number(maxValuesOfOthersparameters.MDMA)) {
        response.sample_result = resPositive;
        return response;
    }

    if (Number(params.THC) >= Number(maxValuesOfOthersparameters.THC)) {
        response.sample_result = resPositive;
        return response;
    }

    if (Number(params.Morfina) >= Number(maxValuesOfOthersparameters.Morfina)) {
        response.sample_result = resPositive;
        return response;
    }

    if (Number(params.Codeina) >= Number(maxValuesOfOthersparameters.Codeina)) {
        response.sample_result = resPositive;
        return response;
    }

    if (Number(params.Heroina) >= Number(maxValuesOfOthersparameters.Heroina)) {
        response.sample_result = resPositive;
        return response;
    }

    /*
        A Cocaína estar acima da nota de corte a concentração de um desses três: 
        Benzoilecgonina, Cocaetileno ou Norcocaína deve ser no mínimo de 0.05.
    */
    
    if (
        Number(params.Cocaina) > Number(maxValuesToCocaineParameter.Cocaina) &&
        (
            Number(params.Benzoilecgonina) >= Number(maxValuesToCocaineParameter.Benzoilecgonina)
            || Number(params.Cocaetileno) >= Number(maxValuesToCocaineParameter.Cocaetileno)
            || Number(params.Norcocaina) >= Number(maxValuesToCocaineParameter.Norcocaina)
        )
    ) {
        response.sample_result = resPositive;
        return response;
    }

    return response;
}

exports.prepareFiledsToInsert = (params) => {
    const fields = {
        CodigoAmostra: params.codigo_amostra,
        Cocaina: params.Cocaina,
        Anfetamina: params.Anfetamina,
        Metanfetamina: params.Metanfetamina,
        MDA: params.MDA,
        MDMA: params.MDMA,
        THC: params.THC,
        Morfina: params.Morfina,
        Codeina: params.Codeina,
        Heroina: params.Heroina,
        Benzoilecgonina: params.Benzoilecgonina,
        Cocaetileno: params.Cocaetileno,
        Norcocaina: params.Norcocaina,
        Result: params.Result
    };        
    return fields;
}

exports.cleanResponse = (params) => {
    
    const cleanResponse = [];

    for (let value of params.values()) {
        cleanResponse.push({
            CodigoAmostra: value.CodigoAmostra,
            Cocaina: value.Cocaina,
            Anfetamina: value.Anfetamina,
            Metanfetamina: value.Metanfetamina,
            MDA: value.MDA,
            MDMA: value.MDMA,
            THC: value.THC,
            Morfina: value.Morfina,
            Codeina: value.Codeina,
            Heroina: value.Heroina,
            Benzoilecgonina: value.Benzoilecgonina,
            Cocaetileno: value.Cocaetileno,
            Norcocaina: value.Norcocaina,
            Result: value.Result,
        });
    }

    return cleanResponse;
};







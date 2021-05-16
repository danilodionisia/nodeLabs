exports.validatePassword = (password) => {
    const minLength = 6;
    const minCount = 0;
    let response = {
        isEmpty: false,
        isInvalidLength: false,
        isIncorrect: false,
    };

    if (!password || password == undefined) {
        response.isEmpty = true;
    } else {
        if (password.length < minLength) {
            response.isInvalidLength = true;
        }

        if (password.search(/[!@#$%^&*]/i) < minCount || password.search(/[0-9]/) < minCount) {
            response.isIncorrect = true;
        }
    }
    return response;
};

exports.validateName = (name) => {
    const minLength = 2;
    let response = {
        isEmpty: false,
        isInvalidLength: false,
        isIncorrect: false,
    };

    if (!name || name == undefined) {
        response.isEmpty = true;
    } else {

        if (name.length < minLength) {
            response.isInvalidLength = true;
        }

        if (isFinite(name)) {
            response.isIncorrect = true;
        }
    }
    return response;
};


exports.validateEmail = (email) => {
    const minCount = 0;
    let response = {
        isEmpty: false,
        isIncorrect: false,
    };

    if (!email || email == undefined) {
        response.isEmpty = true;
    } else {
        const posAt = email.indexOf('@');
        const posDot = email.indexOf('.');
        const posDotAndAt = posAt - posDot;
        
        if (posAt < minCount || posDot < minCount || posDotAndAt == -1 || posDotAndAt == 1) {
            response.isIncorrect = true;
        }
    }
    return response;
};
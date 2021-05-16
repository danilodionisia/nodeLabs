const mongoose = require('../../database');

const ToxicologicSchema = new mongoose.Schema({
    CodigoAmostra: {
        type: Number,
        required: true,
    },
    Cocaina: {
        type: Number,
        required: true,
    },
    Anfetamina: {
        type: Number,
        required: true,
    },
    Metanfetamina: {
        type: Number,
        required: true,
    },
    MDA: {
        type: Number,
        required: true,
    },
    MDMA: {
        type: Number,
        required: true,
    },
    THC: {
        type: Number,
        required: true,
    },
    Morfina: {
        type: Number,
        required: true,
    },
    Codeina: {
        type: Number,
        required: true,
    },
    Heroina: {
        type: Number,
        required: true,
    },
    Benzoilecgonina: {
        type: Number,
        required: true,
    },
    Cocaetileno: {
        type: Number,
        required: true,
    },
    Norcocaina: {
        type: Number,
        required: true,
    },
    Result: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
});

const Toxicologic = mongoose.model('Toxicologic', ToxicologicSchema);

module.exports = Toxicologic;
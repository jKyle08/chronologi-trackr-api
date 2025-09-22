const mongoose = require("mongoose");
const { COMPANY_FEATURES, WORKSETUP_OPTIONS } = require("../../enums/companyEnums");
const { validateId } = require('../../../shared/utils/id');

const CompanySchema = new mongoose.Schema({
    companyId: {
        type: String,
        required: true,
        validate: {
            validator: v => validateId(v),
            message: props => `${props.value} is not a valid UUID`
        }
    },
    companyCode: { type: String, required: true },
    companyName: { type: String, required: true },
    availableFeatures: {
        type: [String],
        validate: {
            validator: arr => arr.every(f => COMPANY_FEATURES.includes(f)),
            message: props => `Invalid feature in ${props.value}`
        }
    },
    billingPlan: { type: String },
    numberOfEmployees: { type: Number },
    location: { type: String },
    workSetup: {
        type: [String],
        validate: {
            validator: arr => arr.every(w => WORKSETUP_OPTIONS.includes(w)),
            message: props => `Invalid work setup in ${props.value}`
        }
    },
    active: { type: Boolean, default: true },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null }
}, { timestamps: true });

// Indexes
CompanySchema.index({ companyId: 1 }, { unique: true });
CompanySchema.index({ companyCode: 1 }, { unique: true });

module.exports = mongoose.model("Company", CompanySchema);

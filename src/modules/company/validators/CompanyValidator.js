const { COMPANY_FEATURES, WORKSETUP_OPTIONS } = require("../../enums/companyEnums");
const { validateId } = require("../../../shared/utils/id");

class CompanyValidator {
    // Private method for common validation
    static _validateFields(data) {
        if (data.availableFeatures) {
            if (!Array.isArray(data.availableFeatures)) throw new Error("availableFeatures must be an array");
            data.availableFeatures.forEach(f => {
                if (!COMPANY_FEATURES.includes(f)) throw new Error(`Invalid feature: ${f}`);
            });
        }

        if (data.workSetup) {
            if (!Array.isArray(data.workSetup)) throw new Error("workSetup must be an array");
            data.workSetup.forEach(w => {
                if (!WORKSETUP_OPTIONS.includes(w)) throw new Error(`Invalid work setup: ${w}`);
            });
        }

        if (data.numberOfEmployees && typeof data.numberOfEmployees !== "number") {
            throw new Error("numberOfEmployees must be a number");
        }

        if (data.companyName && data.companyName.trim() === "") {
            throw new Error("Company name cannot be empty");
        }
    }

    static validateNewCompany(data) {
        if (!data.companyId) throw new Error("Company ID is required");
        if (!validateId(data.companyId)) throw new Error("Invalid company ID");

        if (!data.companyName) throw new Error("Company name is required");
        if (!data.companyCode) throw new Error("Company code is required");

        this._validateFields(data);
    }

    static validateUpdateCompany(data) {
        this._validateFields(data);
    }
}

module.exports = CompanyValidator;

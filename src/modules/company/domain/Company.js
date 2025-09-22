const { COMPANY_FEATURES, WORKSETUP_OPTIONS } = require("../../enums/companyEnums"); // import enums
const { newId, validateId } = require('../../../shared/utils/id');

class Company {
    constructor({
        companyId,
        companyCode,
        companyName,
        availableFeatures = [],
        billingPlan,
        numberOfEmployees,
        location,
        workSetup = [],
        active = true,
        createdBy = null,
        updatedBy = null,
        createdAt = new Date(),
        updatedAt = new Date()
    }) {
        if (!companyId) throw new Error("CompanyId is required");
        if (!validateId(companyId)) throw new Error("companyId must be a valid UUID");

        if (!companyName) throw new Error("CompanyName is required");

        if (!Array.isArray(availableFeatures)) throw new Error("availableFeatures must be an array");
        if (!Array.isArray(workSetup)) throw new Error("workSetup must be an array");

        availableFeatures.forEach(f => {
            if (!COMPANY_FEATURES.includes(f)) throw new Error(`Invalid feature: ${f}`);
        });

        workSetup.forEach(w => {
            if (!WORKSETUP_OPTIONS.includes(w)) throw new Error(`Invalid workSetup: ${w}`);
        });

        this.companyId = companyId;
        this.companyCode = companyCode;
        this.companyName = companyName;
        this.availableFeatures = availableFeatures;
        this.billingPlan = billingPlan;
        this.numberOfEmployees = numberOfEmployees;
        this.location = location;
        this.workSetup = workSetup;
        this.active = active;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Update methods
    updateName(name) {
        if (!name) throw new Error("CompanyName cannot be empty");
        this.companyName = name;
        this.touchUpdatedAt();
    }

    updateBillingPlan(plan) {
        this.billingPlan = plan;
        this.touchUpdatedAt();
    }

    updateWorkSetup(workSetup = []) {
        if (!Array.isArray(workSetup)) throw new Error("workSetup must be an array");
        workSetup.forEach(w => {
            if (!WORKSETUP_OPTIONS.includes(w)) throw new Error(`Invalid workSetup: ${w}`);
        });
        this.workSetup = workSetup;
        this.touchUpdatedAt();
    }

    updateFeatures(features = []) {
        if (!Array.isArray(features)) throw new Error("availableFeatures must be an array");
        features.forEach(f => {
            if (!COMPANY_FEATURES.includes(f)) throw new Error(`Invalid feature: ${f}`);
        });
        this.availableFeatures = features;
        this.touchUpdatedAt();
    }

    // Activate / Deactivate
    activate() {
        this.active = true;
        this.touchUpdatedAt();
    }

    deactivate() {
        this.active = false;
        this.touchUpdatedAt();
    }

    // Internal helper to update timestamp
    touchUpdatedAt() {
        this.updatedAt = new Date();
    }

    // Convert to plain object for persistence
    toPrimitives() {
        return {
            companyId: this.companyId,
            companyCode: this.companyCode,
            companyName: this.companyName,
            availableFeatures: this.availableFeatures,
            billingPlan: this.billingPlan,
            numberOfEmployees: this.numberOfEmployees,
            location: this.location,
            workSetup: this.workSetup,
            active: this.active,
            createdBy: this.createdBy,
            updatedBy: this.updatedBy,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    // Factory method for easier creation
    static create({
        companyCode,
        companyName,
        availableFeatures = [],
        billingPlan,
        numberOfEmployees,
        location,
        workSetup = [],
        createdBy = null
    }) {
        return new Company({
            companyId: newId(),
            companyCode,
            companyName,
            availableFeatures,
            billingPlan,
            numberOfEmployees,
            location,
            workSetup,
            active: true,
            createdBy,
            updatedBy: null,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }
}

module.exports = Company;

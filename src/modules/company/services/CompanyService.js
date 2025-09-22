const Company = require("../domain/Company");
const { v4: uuid } = require("uuid");
const CompanyValidator = require("../validators/CompanyValidator");
const getAuditFields = require("../../../shared/utils/auditFields");

class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }

    async createCompany(data, userId) {
        const companyData = {
            ...data,
            companyId: uuid(),
            ...getAuditFields({ userId, isNew: true })
        };
        CompanyValidator.validateNewCompany(companyData);

        // Duplicate checks
        const existingByName = await this.companyRepository.findByName(companyData.companyName);
        if (existingByName) throw new Error(`Company name '${companyData.companyName}' already exists`);

        const existingByCode = await this.companyRepository.findByCode(companyData.companyCode);
        if (existingByCode) throw new Error(`Company code '${companyData.companyCode}' already exists`);

        // Create domain object and save
        const company = new Company(companyData);
        return this.companyRepository.save(company);
    }

    async updateCompany(companyId, updateData, userId) {
        CompanyValidator.validateUpdateCompany({ ...updateData, companyId });

        // Fetch existing company
        const existing = await this.companyRepository.findById(companyId);
        if (!existing) throw new Error("Company not found");

        // Duplicate checks for updates (exclude self)
        if (updateData.companyName) {
            const existingByName = await this.companyRepository.findByName(updateData.companyName);
            if (existingByName && existingByName.companyId !== companyId) {
                throw new Error(`Company name '${updateData.companyName}' already exists`);
            }
        }

        if (updateData.companyCode) {
            const existingByCode = await this.companyRepository.findByCode(updateData.companyCode);
            if (existingByCode && existingByCode.companyId !== companyId) {
                throw new Error(`Company code '${updateData.companyCode}' already exists`);
            }
        }

        // Merge updates and save
        // If 'existing' is a Company instance, use .toPrimitives() to get a plain object
        const existingData = typeof existing.toPrimitives === "function"
            ? existing.toPrimitives()
            : existing;
        const company = new Company({
            ...existingData,
            ...updateData,
            ...getAuditFields({ userId })
        });
        return this.companyRepository.update(companyId, company.toPrimitives());
    }

    async getAllCompanies() {
        return this.companyRepository.findAll();
    }

    async getCompanyById(companyId) {
        const company = await this.companyRepository.findById(companyId);
        if (!company) throw new Error("Company not found");
        return company;
    }

    async deleteCompany(companyId) {
        return this.companyRepository.delete(companyId);
    }
}

module.exports = CompanyService;
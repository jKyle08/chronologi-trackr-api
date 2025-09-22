const BaseRepository = require("../../../shared/repositories/BaseRepository");
class CompanyRepository extends BaseRepository {
    constructor(companyModel, companyDomain) {
        super(companyModel, companyDomain);
    }

    findByName(name) {
        return this.findByField("companyName", name);
    }

    findByCode(code) {
        return this.findByField("companyCode", code);
    }

    findById(companyId) {
        return super.findById("companyId", companyId);
    }

    update(companyId, updateData) {
        return super.update("companyId", companyId, updateData);
    }

    delete(companyId) {
        return super.delete("companyId", companyId);
    }
}

module.exports = CompanyRepository;


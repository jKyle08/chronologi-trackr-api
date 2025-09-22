const express = require("express");
const router = express.Router();

const CompanyModel = require("../modules/company/models/CompanyModel");
const Company = require("../modules/company/domain/Company");
const CompanyRepository = require("../modules/company/repository/CompanyRepository");
const CompanyService = require("../modules/company/services/CompanyService");
const companyController = require("../modules/company/controllers/CompanyController");

const companyRepository = new CompanyRepository(CompanyModel, Company);
const companyService = new CompanyService(companyRepository);

router.use("/companies", companyController(companyService));
// router.use("/employees", employeeRoutes);

module.exports = router;
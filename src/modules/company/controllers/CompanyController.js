const express = require("express");

module.exports = (companyService) => {
    const router = express.Router();

    // Create company
    router.post("/", async (req, res) => {
        try {
            const company = await companyService.createCompany(req.body);
            res.status(201).json(company);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Get all companies
    router.get("/", async (req, res) => {
        try {
            const companies = await companyService.getAllCompanies();
            res.json(companies);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Get company by ID
    router.get("/:id", async (req, res) => {
        try {
            const company = await companyService.getCompanyById(req.params.id);
            res.json(company);
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    });

    // Update company
    router.put("/:id", async (req, res) => {
        try {
            const updated = await companyService.updateCompany(req.params.id, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Delete company
    router.delete("/:id", async (req, res) => {
        try {
            await companyService.deleteCompany(req.params.id);
            res.json({ message: "Company deleted" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
const Company = require('../src/modules/company/domain/Company'); // adjust path if needed
const { COMPANY_FEATURES, WORKSETUP_OPTIONS } = require('../src/modules/enums/companyEnums');

module.exports = {
  async up(db) {
    // Create the collection if it doesn't exist
    const collections = await db.listCollections({ name: 'companies' }).toArray();
    if (!collections.length) {
      await db.createCollection('companies');
    }

    // Example seed data
    const companiesData = [
      {
        companyCode: "COMP001",
        companyName: "Test Company 1",
        availableFeatures: ["Geo", "QR"],
        billingPlan: "Modular",
        numberOfEmployees: 10,
        location: "HQ",
        workSetup: ["Onsite", "Remote"]
      },
      {
        companyCode: "COMP002",
        companyName: "Test Company 2",
        availableFeatures: ["Facial", "Fingerprint"],
        billingPlan: "Combo",
        numberOfEmployees: 25,
        location: "Branch A",
        workSetup: ["Hybrid"]
      },
      {
        companyCode: "COMP003",
        companyName: "Test Company 3",
        availableFeatures: ["Geo", "Facial", "QR"],
        billingPlan: "Modular",
        numberOfEmployees: 50,
        location: "Branch B",
        workSetup: ["Onsite"]
      }
    ];

    // Create domain objects and convert to primitives
    const companies = companiesData.map(data => Company.create(data).toPrimitives());

    // Insert into the database
    await db.collection('companies').insertMany(companies);
  },

  async down(db) {
    // Drop the companies collection (rollback)
    await db.collection('companies').drop();
  }
};

const { v4: generateUUID, validate: isUuid } = require("uuid");

/**
 * Generate a new UUID
 * @returns {string}
 */
function newId() {
    return generateUUID();
}

/**
 * Validate if a string is a valid UUID
 * @param {string} id
 * @returns {boolean}
 */
function validateId(id) {
    return isUuid(id);
}

module.exports = {
    newId,
    validateId
};

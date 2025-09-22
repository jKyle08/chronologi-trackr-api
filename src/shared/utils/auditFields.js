function getAuditFields({ userId, isNew = false }) {
    const now = new Date();
    if (isNew) {
        return {
            createdBy: userId,
            updatedBy: userId,
            createdAt: now,
            updatedAt: now
        };
    }
    return {
        updatedBy: userId,
        updatedAt: now
    };
}

module.exports = getAuditFields;
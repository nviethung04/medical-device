const { validate: uuidValidate, version: uuidVersion } = require('uuid');

function validateUUID(uuid) {
    if (!uuid) return false;
    return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

function getUUID(id) {
    if (!id || !validateUUID(id)) {
        return null;
    }
    return id;
}

function buildWhereClause(conditions) {
    const whereClause = [];
    const values = [];
    let paramCounter = 1;

    for (const [key, value] of Object.entries(conditions)) {
        if (value !== undefined && value !== null) {
            whereClause.push(`${key} = $${paramCounter}`);
            values.push(value);
            paramCounter++;
        }
    }

    return {
        clause: whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '',
        values,
    };
}

function buildUpdateClause(updates) {
    const updateClause = [];
    const values = [];
    let paramCounter = 1;

    for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined && value !== null) {
            updateClause.push(`${key} = $${paramCounter}`);
            values.push(value);
            paramCounter++;
        }
    }

    return {
        clause: updateClause.join(', '),
        values,
    };
}

module.exports = {
    validateUUID,
    getUUID,
    buildWhereClause,
    buildUpdateClause
};

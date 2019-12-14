const Batch = require('../models/batch.model');

module.exports = {
    batches: async () => {
        const batch = new Batch();
        try {
            const data = await batch.queryAll()
            return data;
        }
        catch (err) {
            throw err;
        }
    },
    createBatch: async (args) => {
        const batch = new Batch();
        try {
            const mutation = await batch.createBatch(args);
            return mutation;
        }
        catch (err) {
            throw err;
        }
    }
}
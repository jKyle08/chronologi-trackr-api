class BaseRepository {
    constructor(model, DomainClass) {
        this.model = model;
        this.DomainClass = DomainClass;
    }

    async save(entity) {
        const doc = new this.model(entity.toPrimitives());
        await doc.save();
        return new this.DomainClass(doc.toObject());
    }

    async findAll(filter = {}) {
        const docs = await this.model.find(filter);
        return docs.map(doc => new this.DomainClass(doc.toObject()));
    }

    async findById(idField, idValue) {
        const doc = await this.model.findOne({ [idField]: idValue });
        return doc ? new this.DomainClass(doc.toObject()) : null;
    }

    async findByField(fieldName, value) {
        const doc = await this.model.findOne({ [fieldName]: value });
        return doc ? new this.DomainClass(doc.toObject()) : null;
    }

    async update(idField, idValue, updateData) {
        const doc = await this.model.findOneAndUpdate(
            { [idField]: idValue },
            updateData,
            { new: true }
        );
        return doc ? new this.DomainClass(doc.toObject()) : null;
    }

    async delete(idField, idValue) {
        const doc = await this.model.findOneAndDelete({ [idField]: idValue });
        return doc ? new this.DomainClass(doc.toObject()) : null;
    }
}

module.exports = BaseRepository;

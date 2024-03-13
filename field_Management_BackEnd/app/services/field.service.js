const {ObjectId} = require("mongodb");

class FieldService {
    constructor(client) {
        this.Field = client.db().collection("field");
    }

    extractFieldData(payload){
        const field = {
            fieldName: payload.fieldName,
            fieldAddress: payload.fieldAddress,
            priceFrom: payload.priceFrom,
            priceTo: payload.priceTo,
            ownerPhoneNumber: payload.ownerPhoneNumber,
            rating: payload.rating,
        };

        Object.keys(field).forEach(
            (key) => field[key] === undefined && delete field[key]
        );

        return field;
    }

    //Tạo field
    async create(payload) {
        const field = this.extractFieldData(payload);
        const result = await this.Field.findOneAndUpdate(
            field,
            { $set: {rating: 0}},
            {returnDocument: "after", upsert: true}
        );

        return result;
    }

    //find field theo filter
    async find(filter){
        const cursor = await this.Field.find(filter);
        return await cursor.toArray();
    }

    async findById(id){
        return await this.Field.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }

        const update = this.extractFieldData(payload);
        const result = await this.Field.findOneAndUpdate(
            filter,
            {$set: update},
            {returnDocument: "after"}
        );
        
        return result;
    }
}

module.exports = FieldService;
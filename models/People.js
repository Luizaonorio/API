import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, validate: /[A-zÀ-ú\s]+$/, required: true },
        cpf: { type: String, validate: /^[0-9]*$/, minLength: 11, maxLength: 11, required: true },
        birthDate: { type: String, required: true },
        email: { type: String, validate: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, required: true},
        password: { type: String, select: false, minLength: 6, required: true },
        address: { type: String, required: true },
        number: { type: String, required: true },
        complement: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, minLength: 8, maxLength: 8, required: true }
    },
    {
        versionKey: false
    }
);

const person = mongoose.model('person', peopleSchema);

export default person;
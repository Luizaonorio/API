import mongoose from "mongoose";

function birthday(birth) {
    let birthday = new Date(birth);
    let inDate = new Date();
    let age = Math.floor((inDate - birthday) / 31536000000);

    if (age > 17) {
        return true;
    } else {
        return false;
    };
}

function changeDate(date) {
    let inDate = new Date(date);
    return inDate.toLocaleDateString();
}

const peopleSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, validate: /[A-zÀ-ú\s]+$/, required: true },
        cpf: { type: String, validate: /^[0-9]*$/, minlength: 11, maxlength: 11, required: true },
        birthDate: { type: String, set: date => changeDate(date), required: true, validate: [birthday, "18"] },
        email: { type: String, validate: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/, required: true },
        password: { type: String, minlength: 6, required: true },
        address: { type: String, validate: /[A-zÀ-ú\s]/, required: true },
        number: { type: String, validate: /^[0-9]*$/, required: true },
        complement: { type: String, required: true },
        city: { type: String, validate: /[A-zÀ-ú\s]/, required: true },
        state: { type: String, validate: /[A-Z]/, required: true },
        country: { type: String, validate: /[A-zÀ-ú\s]/, required: true },
        zipCode: { type: String, validate: /^[0-9]*$/, minlength: 8, maxlength: 8, required: true }
      },
    {
        versionKey: false
    }
);

const person = mongoose.model('person', peopleSchema);

export default person;
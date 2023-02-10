import mongoose from "mongoose";
const {Schema}  = mongoose;

const donarSchema = new Schema({
    fullName: {type: String, required: true, lowercase: true, trim: true},
    phoneNo: {type: String, required: true, lowercase: true, trim: true},
    donationType: {type: String, required: true, lowercase: true, trim: true},
    bloodType: {type: String, trim: true},
    state: {type: String, required: true, lowercase: true, trim: true},
    city: {type: String, required: true, lowercase: true, trim: true}

}, {timestamps: true, toJSON: {getters: true}} );

export default mongoose.model("Donar", donarSchema);
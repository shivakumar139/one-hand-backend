import mongoose from "mongoose";
const {Schema}  = mongoose;

const ngoSchema = new Schema({
    bloodBankName: {type: String},
    state: {type: String},
    city: {type: String},
    address: {type: String},
    pincode: {type: String},
    contactNo: {type: String},
    mobile: {type: String},
    website: {type: String},
    category: {type: String},
    serviceTime: {type: String},
    latitude: {type: String},
    longitude: {type: String}

}, {timestamps: true} );

export default mongoose.model("Ngo", ngoSchema);
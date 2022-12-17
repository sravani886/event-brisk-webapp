import mongoose, { Mongoose } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Define the model
const VenueSchema = new mongoose.Schema({
    venueName: String,
    venueLocation: String,
    venueAddress: String,
    venueImageData: String,
    venuePeopleCount: {
        type: Number,
        min: 0
    },
    venuePrice:  Number,
    venueAvailableFrom: Date,
    venueAvailableTo: Date,
    CreateBy: String
})

const VenueServiceSchema = new mongoose.Schema({
    venueServiceName: String,
    venueId: String,
    serviceProviderId: String,
    servicePrice: Number
})


const VenueModel = mongoose.model('Venue', VenueSchema);
const VenueServiceModel  = mongoose.model('VenueService', VenueServiceSchema)

exports.VenueModel = VenueModel;
exports.VenueServiceModel = VenueServiceModel;






import mongoose, { Mongoose } from 'mongoose';


const EventSchema = new mongoose.Schema({
    eventType:{
        type:String
    },
    eventDate:{
        type:Date
    },
    venueId:{
        type:String
    },
    venueServiceIds:{
        type:Array
    },
    eventCreatedBy:{
        type:String
    },
    eventPhoto:{
        type:String
    }
})

const EventModel = mongoose.model('Event', EventSchema)

export default EventModel
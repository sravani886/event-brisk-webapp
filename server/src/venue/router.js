import {VenueModel, VenueServiceModel} from "./models"

const router = require('express').Router();

// Service Stuff
router.get('/all', (req, res)=>{
    const venue = VenueModel.find({}, (err, venues) => {
        if(err || !venues)
            return res.status(401).send(err || {err: "Nothing Found"})
        if(venues)
            return res.json(venues)
    })
})

router.get('/:venue_id', (req, res)=>{
    const venue_id = req.params.venue_id
    console.log(venue_id)
    const venue = VenueModel.findById(venue_id, (err, existingvenue) => {
        if(err || !existingvenue)
            return res.status(401).send(err || {err: "venue Not Found"})
        if(existingvenue)
            return res.json(existingvenue)
    })
})



router.post('/', (req, res) => {
    console.log(req.body)
    const venue = new VenueModel({
        venueName: req.body.venueName,
        venueLocation: req.body.venueLocation,
        venueAddress: req.body.venueAddress,
        venueImageData: req.body.venueImageData,
        venuePeopleCount: req.body.venuePeopleCount,
        venuePrice: req.body.venuePrice,
        venueAvailableFrom: req.body.venueAvailableFrom,
        venueAvailableTo: req.body.venueAvailableTo,
        CreateBy: req.user._id
    })

    venue.save((err, savedvenue) => {
        if(err){
            return res.status(500).json({err: err})
        }
        res.json({
            success:true,
            venueId: venue._id
        })
    })

})

router.put('/:venue_id', (req, res) => {
    const venue_id = req.params.venue_id;

    console.log(req.body)

    VenueModel.findByIdAndUpdate(venue_id, {...req.body}, {new: true} )
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))

})

router.delete('/:venue_id', (req, res) => {
    const venue_id = req.params.venue_id;

    console.log(req.body)

    VenueModel.findByIdAndDelete(venue_id, (err) => {
        if(err) res.status(500).send(err)
        res.status(200).send("lol")
    })
})


// Service Stuff

router.get('/service/all/all', (req, res) => {
    VenueServiceModel.find({}, (err, docs) => {
        if(err || !docs)
            return res.status(401).send(err || {err: "Venue Not Found"})
        if(docs)
            return res.json(docs)
    }) 
})
router.get('/service/all', (req, res) => {
    VenueServiceModel.find({serviceProviderId: req.user._id}, (err, docs) => {
        if(err || !docs)
            return res.status(401).send(err || {err: "Venue Not Found"})
        if(docs)
            return res.json(docs)
    }) 
})

router.put('/service/:service_id', (req, res) => {
    const service_id = req.params.service_id;

    console.log(req.body)

    VenueServiceModel.findByIdAndUpdate(service_id, {...req.body}, {new: true} )
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))

})

router.get('/service/:service_id', (req, res) => {
    const service_id = req.params.service_id
    VenueServiceModel.findById(service_id, (err, docs) => {
        if(err || !docs)
            return res.status(401).send(err || {err: "service not found"})
        if(docs)
            return res.json(docs)
    }) 
})

router.delete('/service/:service_id', (req, res) => {
    const service_id = req.params.service_id;

    console.log(req.body)

    VenueServiceModel.findByIdAndDelete(service_id, (err) => {
        if(err) res.status(500).send(err)
        res.status(200).send("lol")
    })
})

router.post('/service/', (req, res)=>{
    const venueService = new VenueServiceModel({
        venueServiceName : req.body.venueServiceName,
        venueId : req.user.venue_id,
        serviceProviderId : req.user._id,
        servicePrice : req.body.servicePrice
    })
    venueService.save((err, savedvenueService) => {
        if(err){
            return res.status(500).json({err: err})
        }
        res.json({
            success:true,
            savedvenueService_id: savedvenueService._id
        })
    })
})

export default router;
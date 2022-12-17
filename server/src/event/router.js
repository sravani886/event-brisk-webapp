import EventModel from './models';
const nodemailer = require('nodemailer');
const router = require('express').Router();
const sendgrid = require('@sendgrid/mail');

router.post('/', (req, res) => {
    const event = new EventModel({
      eventType:req.body.eventType,
      venueId:req.body.venueId,
      venueServiceIds:req.body.venueServiceIds,
      eventDate: req.body.eventDate,
      eventCreatedBy:req.user._id,
      eventPhoto:req.body.eventPhoto
    })
    event.save((err, event) => {
        if(err){
            return res.status(500).json({err: err})
        }
        res.json({
            success:true,
            event_id: event
        })
    })
  })
  
  router.get('/all', (req, res) => {
    EventModel.find({}, (err, docs) => {
      if(err || !docs) return res.status(500).send(err)
      return res.json(docs)
    })
  })

  router.get('/user', (req, res) => {
    send_mail('')

    EventModel.find({eventCreatedBy: String(req.user._id)}, (err, docs) => {
      if(err || !docs) return res.status(500).send(err)
      return res.json(docs)
    })
  })


const send_mail = async (user) => {
  const SENDGRID_API_KEY = "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"

  sendgrid.setApiKey(SENDGRID_API_KEY)

  const msg = {
     to: 'harsha.jediknight@gmail.com',
   // Change to your recipient
     from: 'eventmanager1123@gmail.com',
   // Change to your verified sender
     subject: 'Sending with SendGrid Is Fun',
     text: 'and easy to do anywhere, even with Node.js',
     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sendgrid
     .send(msg)
     .then((resp) => {
       console.log('Email sent\n', resp)
     })
     .catch((error) => {
       console.error(error.response.body)
   })
}
export default router;
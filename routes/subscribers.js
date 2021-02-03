const express = require('express');
// const subscriber = require('../models/subscriber');
const router = express.Router();
const Subscriber = require('../models/subscriber')

//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log('me')
    }
});

//Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.json(req.subscriber)
});

//Creating one 
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

//Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        res.subscriber.remove()
        res.json({ message: 'Deleted subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

async function getSubscriber(req, res, next) {
    try {
        let subscriber;
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
        res.subscriber = subscriber;
        next()
    }
    catch (err) {
       return res.status(500).json({ message: err.message })
    }


}

module.exports = router
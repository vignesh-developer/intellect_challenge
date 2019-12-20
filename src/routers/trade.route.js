const express = require('express')
const Trade = require('../models/trade.model')
const router = new express.Router()

/* create a new trade */
router.post('/trades', async (req, res) => {
    const trade = new Trade({
        ...req.body,
    })
    try {
        const result = await trade.save()
        console.log(result)
        res.status(201).send({message: "The trade record has been saved successfully"})
    }
    catch (e) {
        res.status(400).send(e)
    }
})

/* get all trades with sorting based on id */
router.get('/trades', async (req, res) => {
    try {
        const result = await Trade.find({}).sort({ id: 1 })
        res.status(200).send({ data: result })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

/* get all trades with sorting based on user id */
router.get('/trades/users/:userId', async (req, res) => {
    try {
        const result = await Trade.find({ "user.id": req.params.userId }).sort({ id: 1 })
        res.status(200).send({ data: result })
    }
    catch (e) {
        res.status(400).send(e)
    }
})

/* get all trades with sorting based on stock symbol and trade type in the date range */
router.get('/stocks/:stockSymbol/trades', async (req, res) => {
    const date = {}
    date.start = new Date(req.query.start)
    date.end = new Date(req.query.end)
    try {
        const result = await Trade.find({ symbol: req.params.stockSymbol, type: req.query.type, timestamp: { "$gte": date.start, "$lte": date.end } })
            .sort({ id: 1 })
        if (!result.length) {
            res.status(404).send({ message: "There are no trades in the given date range" })
        }
        else {
            res.status(200).send({ data: result })
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
})

/* get highest and lowest price for stock symbol in the date range */
router.get('/stocks/:stockSymbol/price', async (req, res) => {
    const date = {}
    date.start = new Date(req.query.start)
    date.end = new Date(req.query.end)
    try {
        const result = await Trade.aggregate([
            {
                $match:
                {
                    'symbol': req.params.stockSymbol,
                    'timestamp':
                    {
                        $gte: date.start,
                        $lte: date.end
                    }
                }
            },
            {
                $group:
                {
                    _id: "$symbol",
                    symbol: { $first: "$symbol" },
                    highest: { $max: "$price" },
                    lowest: { $min: "$price" }
                }
            }
        ])
        if (result.length) {
            res.status(200).send({ data: result })
        }
        else {
            res.status(404).send({ message: "There are no trades in the given date range" })
        }
    }
    catch (e) {
        res.status(400).send(e)
    }
})

/* delete all trades */
router.delete('/erase', async (req, res) => {
    try {
        const result = await Trade.deleteMany({})
        res.status(200).send({ message: "Successfully erased all trades" })
    }
    catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router
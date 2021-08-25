import express from 'express'
import Snack from '../models/snacks.js'

const router = express()

// Getting all snacks
router.get('/', async (req, res) => {
    try {
        const snacks = await Snack.find()
        res.json(snacks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Getting one snack
router.get('/:id', getSnack, (req, res) => {
    res.json(res.snack)
})

// Create one snack
router.post('/', async (req, res) => {
    const snack = new Snack({
        name: req.body.name,
        weight: req.body.weight,
        price: req.body.price,
        quantity: req.body.quantity
    })

    console.log(snack)

    try {
        const newSnack = await snack.save()
        res.status(201).json(newSnack)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// delete one snack
router.delete('/:id', getSnack, async (req, res) => {
    try {
        await res.snack.remove()
        res.json({ message: 'Deleted Snack from the list' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSnack (req, res, next) {
    let snack 
    try {
        snack = await Snack.findById(req.params.id)

        if (snack == null) {
            return res.status(404).json({ message: 'Cannot find snack' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.snack = snack
    next()
}

export default router

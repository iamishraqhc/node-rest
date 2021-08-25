import mongoose from 'mongoose'

const snacksSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Snack', snacksSchema)

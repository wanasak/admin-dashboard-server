import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './routes/clientRoute.js'
import generalRoutes from './routes/generalRoute.js'
import managementRoutes from './routes/managementRoute.js'
import salesRoutes from './routes/salesRoute.js'

// DATA IMPORT
import User from './models/User.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import OverallStat from './models/OverallStat.js'
import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat
} from './data/data.js'

// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())

// ROUTES
app.use('/clients', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

    // ONLY ADD DATA ONE TIME
    // Product.insertMany(dataProduct);
    // OverallStat.insertMany(dataOverallStat);
    // ProductStat.insertMany(dataProductStat);
    // User.insertMany(dataUser)
    // Transaction.insertMany(dataTransaction)
}).catch(err => {
    console.log('Mongo db did not connect: ' + err.message)
})
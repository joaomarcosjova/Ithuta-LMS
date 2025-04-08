import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, paypalWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinay from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'

// initialize express 
const app = express()

// connect to db
await connectDB()
await connectCloudinay()

// ✅ Set up proper CORS config
app.use(cors({
  origin: 'https://ithuta.vercel.app', // allow frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Global middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => {
  res.send('Ithuta API is working fine!')
})

app.post('/clerk', clerkWebhooks)
app.use('/api/educator', educatorRouter)
app.use('/api/course', courseRouter)
app.use('/api/user', userRouter)

// ✅ Updated to PayPal only
app.post('/api/user/paypal-webhook', express.json(), paypalWebhooks)

// Port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})

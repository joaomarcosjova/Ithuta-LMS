import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, paypalWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinay from './configs/cloudinary.js';
import courseRouter from './routes/courseRoute.js';
import userRouter from './routes/userRoutes.js';

// initialize express 
const app = express();

// ✅ CORS configuration to allow frontend
const allowedOrigins = ['https://ithuta.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// connect to db and cloudinary
await connectDB();
await connectCloudinay();

// Clerk middleware
app.use(clerkMiddleware());

// ✅ Allow JSON + URL encoded requests globally (important for POST data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send("Ithuta API is working fine!");
});

app.post('/clerk', clerkWebhooks);
app.post('/api/user/paypal-webhook', paypalWebhooks); // ✅ New PayPal webhook route

app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

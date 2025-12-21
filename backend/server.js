import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import { connectDB } from './lib/db.js';
import { app, server } from "./lib/socket.js";
<<<<<<< HEAD:backend/server.js


dotenv.config();

=======
import path from 'path';

const __dirname = path.resolve();

dotenv.config();

connectDB();

>>>>>>> c73f35997bbcc54f3b676c279484fe5fb7ef19c4:backend/src/server.js
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

<<<<<<< HEAD:backend/server.js
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

=======
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', "dist", "index.html"));
  });
}

>>>>>>> c73f35997bbcc54f3b676c279484fe5fb7ef19c4:backend/src/server.js
server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
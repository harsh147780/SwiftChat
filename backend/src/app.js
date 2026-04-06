const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);


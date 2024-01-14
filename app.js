const express = require('express');
const cors = require('cors');
const app = express();



app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/customers', require('./routers/router'));
app.use('/users', require('./routers/userRouter'));
app.use('/sales', require('./routers/salesRouter'));
app.use('/adminUsers', require('./routers/adminRouter'));
app.use('/inbox', require ('./routers/inboxrouter'));



module.exports = app;
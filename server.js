const http = require('http');
const mongoose = require('mongoose')
const app = require('./app');
const PORT = 3000;
const mongoUrl = 'mongodb+srv://joshuablasco04:cKvD4rZXO1qGWLIN@joshuab.emfqlcv.mongodb.net/Products?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.on('open', () => {
    console.log('MongoDb is Connected');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function startServer(){
    await mongoose.connect(mongoUrl)
    
    server.listen(PORT, ()=>{
        console.log(`Server is now listening to http://localhost:${PORT}`);

    })
}

startServer();
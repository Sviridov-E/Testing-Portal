const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/tests', require('./routes/tests.route'));
app.use('/api/result', require('./routes/result.route'));

const PORT = config.get('port') || 5000;

async function start(){
  try {
    mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch(e) {
    console.error('Server Error: ', e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, ()=>{
  console.log(`Server working on port ${PORT}`); 
})
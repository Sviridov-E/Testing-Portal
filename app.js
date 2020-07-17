const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

const app = express();

app.use(express.json());
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/tests', require('./routes/tests.route'));
app.use('/api/result', require('./routes/result.route'));
app.use('/api/chart', require('./routes/chart.route'));
app.use('/api/refresh-token', require('./routes/refreshToken.route'));

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || config.get('port') || 5000;

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
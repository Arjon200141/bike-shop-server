const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Bike Shop is Running');
});
app.listen(port , ()=>{
    console.log(`Bike Shop is Running at ${port}`);
})
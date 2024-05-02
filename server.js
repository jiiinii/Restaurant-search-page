const mongoose = require('mongoose');
require('dotenv').config({path:'variable.env'});
const MONGODB_URL = 'mongodb+srv://jiiinhuiii0104:niD4HQXWphfczZOl@cluster0.cnekfui.mongodb.net/'

mongoose.connect(MONGODB_URL, {useNewUrlParser: true}, (err) => {
    if(err) {
        console.log('error');
    } else {
        console.log('Connected to database successfully');
    }
})
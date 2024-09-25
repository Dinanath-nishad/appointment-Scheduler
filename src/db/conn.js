const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.set("strictQuery", false); // Optional: Mongoose strict query setting

// Connect to the database
mongoose.connect(DB).then(() => {
    console.log('Connection successful');
}).catch((err) => {
    console.error('Connection error:', err);
});

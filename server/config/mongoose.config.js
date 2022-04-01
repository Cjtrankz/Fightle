const mongoose = require('mongoose');

module.exports = (DB) => {
    mongoose.connect(`mongodb://localhost/${DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log(`Established a connection to the ${DB} database`))
        .catch(err => console.log('Something went wrong when connecting to the database ', err));
}
const fastify = require('fastify');
const setupRoutes = require('./routes');
// const dataProcessor = require('./dataProcessor');
const fs = require('fs')
// const globalData = require('./csvData')
const dataSrc = require('../data/data.js')
const app = fastify();
const PORT = 5555;

// Load data from file
const filePath = '../data/city_populations.csv';
const data = fs.readFileSync(filePath, 'utf8');
const str = data.toString();
let newStr;

// Process data and store in dataProcessor

for (let i = 0; i < str.length; i++) {
    if (!(str[i] == '\n' || str[i] == '\r')) {
        newStr += str[i];
    } else if (!(str[i] == '\n')) {
        newStr += ';';
    }
}
dataSrc.updateData(newStr);
console.log(dataSrc.getData());
// Register routes and pass newstr as a parameter
setupRoutes(app);

// Start the Fastify server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// module.exports = { newstr }

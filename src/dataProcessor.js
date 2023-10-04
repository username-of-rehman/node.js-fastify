
const dataSrc = require('../data/data.js');
const dataProcessor = {

    getPopulation(city, state) {
        let newstr = dataSrc.getData();
        const pattern = `${city},${state},(\\d+);`;
        const regex = new RegExp(pattern, 'i');
        const match = newstr.match(regex);

        if (match && match[1]) {
            return parseInt(match[1], 10);
        } else {
            return null;
        }
    },

    updatePopulation(city, state, newPopulation) {
        let newstr = dataSrc.getData();
        const pattern = `${city},${state},(\\d+);`;
        const regex = new RegExp(pattern, 'i');
        const match = newstr.match(regex);

        if (match && match[1]) {
            newstr = newstr.replace(match[0], `${city},${state},${newPopulation};`);
            dataSrc.updateData(newstr);
            return `Population updated for ${city}, ${state}`;
        } else {
            return `No data found for ${city}, ${state}.`;
        }
    },
};

module.exports = dataProcessor;

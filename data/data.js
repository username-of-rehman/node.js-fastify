// data.js
let dataString = null;

module.exports = {
    getData: () => dataString,
    updateData: (newData) => {
        dataString = newData;
    },
};

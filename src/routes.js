const { getPopulation, updatePopulation } = require('./dataProcessor');
const dataSrc = require('../data/data.js')
function setupRoutes(fastify) {

    fastify.get('/api/population/state/:state/city/:city', async (request, reply) => {
        let newstr = dataSrc.getData();
        const state = request.params.state.toLowerCase();
        const city = request.params.city.toLowerCase();

        const population = getPopulation(city, state, newstr);
        if (population !== null) {
            reply.status(200).send(population);
        } else {
            reply.status(404).send('Population data not found for the specified state/city.');
        }
    });

    fastify.put('/api/population/state/:state/city/:city', async (request, reply) => {
        let newstr = dataSrc.getData();
        const state = request.params.state.toLowerCase();
        const city = request.params.city.toLowerCase();
        const population = String(request.body);

        if (population == "undefined") {
            reply.status(400).send('Invalid population data provided');
        }
        else if (getPopulation(city, state) === null) {
            newstr += `;${city},${state},${population};`;
            dataSrc.updateData(newstr);
            reply.status(201).send("data populated");
        } else {
            updatePopulation(city, state, population);
            reply.status(200).send('Population updated');
        }
    });


}

module.exports = setupRoutes;

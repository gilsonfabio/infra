const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const cargos = await connection('obrCargos')
        .select('*');
    
        return response.json(cargos);
    },

    async searchCargo (request, response) {
        let id = request.params.idCrg;
        
        const cargo = await connection('obrCargos')
        .where('crgId', id)
        .select('*');
    
        return response.json(cargo);
    },

    async create(request, response) {
        //console.log(request.body);

        const {crgDescricao } = request.body;
        let status = 'A';

        const [crgId] = await connection('obrCargos').insert({
            crgDescricao             
        });
           
        return response.json({crgId});
    },
    
    async updCargo(request, response) {
        let id = request.params.crgId;

        const {crgDescricao} = request.body;
        
        const [cargo] = await connection('obrCargos')
        .where('crgId', id)
        .update({
            crgDescricao             
        });
           
        return response.json({cargo});
    },   
};

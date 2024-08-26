const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const equipamentos = await connection('obrEquipamentos')
        .select('*');
    
        return response.json(equipamentos);
    },

    async searchEquipamento (request, response) {
        let id = request.params.idEqu;
        const equipamento = await connection('obrEquipamentos')
        .where('equId', id)
        .select('*');
    
        return response.json(equipamento);
    },

    async create(request, response) {
        const {equDescricao } = request.body;
        let status = 'A';

        const [equId] = await connection('obrEquipamentos').insert({
            equDescricao             
        });
           
        return response.json({equId});
    },
    
    async updEquipamento(request, response) {
        let id = request.params.IdEqu;

        const {equDescricao} = request.body;
        
        const [equipamento] = await connection('obrEquipamentos')
        .where('equId', id)
        .update({
            equDescricao             
        });
           
        return response.json({equipamento});
    },   
};

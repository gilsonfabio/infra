const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const atividades = await connection('obrAtividades')
        .select('*');
    
        return response.json(atividades);
    },

    async create(request, response) {
        //console.log(request.body);

        const {atvDescricao } = request.body;
        let status = 'A';

        const [atvId] = await connection('obrAtividades').insert({
            atvDescricao             
        });
           
        return response.json({atvId});
    },
    
    async updAtividade(request, response) {
        let id = request.params.atvId;

        const {atvDescricao} = request.body;
        
        const [atividade] = await connection('obrAtividades')
        .where('atvId', id)
        .update({
            atvDescricao             
        });
           
        return response.json({atividade});
    },   
};

const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const secretarias = await connection('obrSecretarias')
        .select('*');
    
        return response.json(secretarias);
    },

    async create(request, response) {
        //console.log(request.body);

        const {obrSecDescricao } = request.body;
        let status = 'A';

        const [obrSecId] = await connection('obrSecretarias').insert({
            obrSecDescricao             
        });
           
        return response.json({obrId});
    },
    
    async updSecretaria(request, response) {
        let id = request.params.secId;

        const {obrSecDescricao} = request.body;
        
        const [secretaria] = await connection('obrSecretarias')
        .where('obrSecId', id)
        .update({
            obrSecDescricao             
        });
           
        return response.json({secretaria});
    },   
};

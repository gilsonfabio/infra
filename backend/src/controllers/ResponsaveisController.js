const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const responsaveis = await connection('obrResponsaveis')
        .select('*');
    
        return response.json(responsaveis);
    },

    async create(request, response) {
        //console.log(request.body);

        const {obrResNome, obrResCargo, obrResStatus } = request.body;
        let status = 'A';

        const [obrResId] = await connection('obrResponsaveis').insert({
            obrResNome,
            obrResCargo,
            obrResStatus             
        });
           
        return response.json({obrResId});
    },
    
    async updResponsavel(request, response) {
        let id = request.params.resId;

        const {obrResNome, obrResCargo, obrResStatus} = request.body;
        
        const [responsavel] = await connection('obrResponsaveis')
        .where('obrResId', id)
        .update({
            obrResNome,
            obrResCargo,
            obrResStatus             
        });
           
        return response.json({responsavel});
    },   
};

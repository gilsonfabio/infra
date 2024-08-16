const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        const obras = await connection('obras')
        .select('*');
    
        return response.json(obras);
    },

    async searchObra (request, response) {
        let obrId = request.params.idObr;

        const obra = await connection('obras')
        .where('obrId', obrId)
        .select('*');
    
        return response.json(obra);
    },

    async totObras (request, response) {
        let staObra = request.params.status;

        console.log('Status Anterior:', request.params.status);
        console.log('Status:', staObra);

        if(staObra === "T" ) {
            const obra = await connection('obras')
            .count({ count: '*' })
            .sum({totVlrObra:'obrVlrContrato'})
            const countObras = JSON.stringify(obra[0].count);
            const totObras = obra[0].totVlrObra;

            return response.json({countObras, totObras});
        }else {
            const obra = await connection('obras')
            .where('obrStatus', staObra)
            .count({ count: '*' })
            .sum({totVlrObra:'obrVlrContrato'})
            const countObras = JSON.stringify(obra[0].count);
            const totObras = obra[0].totVlrObra;

            return response.json({countObras, totObras});
        }       
    },

    async etapas (request, response) {
        let obrId = request.params.idObr;

        const etapas = await connection('obrEtapas')
        .where('obrEtaIdObra', obrId)
        .select('*');
    
        return response.json(etapas);
    },

    async searchEtapa (request, response) {
        let obrId = request.params.idObr;
        let etaId = request.params.idEta;
        const etapa = await connection('obrEtapas')
        .where('obrEtaIdObra', obrId)
        .where('obrEtaId', etaId)
        .select('*');
    
        console.log(etapa)
        return response.json(etapa);
    },

    async create(request, response) {
        //console.log(request.body);

        const {obrNome, obrDescricao, obrLogradouro, obrNumero, obrComplemento, obrBairro, obrCidade, obrUf, obrCep, obrSecretaria, obrContrato, obrUrlContrato, obrInicio, 
            obrPreTermino, obrVlrContrato, obrVlrAditivo, obrVlrTotal, obrVlrPago} = request.body;
        let status = 'A';
        let etapas = 0;
        let urlContrato = "";
        let vlrTotal = 0.00;

        const [obrId] = await connection('obras').insert({
            obrNome, 
            obrDescricao, 
            obrLogradouro, 
            obrNumero, 
            obrComplemento, 
            obrBairro, 
            obrCidade, 
            obrUf, 
            obrCep, 
            obrSecretaria, 
            obrContrato,
            obrUrlContrato: urlContrato, 
            obrInicio, 
            obrPreTermino,
            obrStatus: status, 
            obrVlrContrato, 
            obrVlrAditivo, 
            obrVlrTotal: vlrTotal, 
            obrVlrPago: vlrTotal, 
            obrTotEtapas: etapas
        });
           
        return response.json({obrId});
    },
    
    async createEtapa(request, response) {
        //console.log(request.body);

        const {obrEtaId, 
            obrEtaIdObra,
            obrEtaNome, 
            obrEtaInicio, 
            obrEtaPrevisao, 
            obrEtaTermino, 
            obrEtaDescricao,
            obrEtaIdResp,
            obrEtaEntrega,
            obrEtaDatFisc,
            obrEtaIdFisc } = request.body;
        let status = 'A';

        const [etapas] = await connection('obrEtapas').insert({
            obrEtaId,
            obrEtaIdObra, 
            obrEtaNome, 
            obrEtaInicio, 
            obrEtaPrevisao, 
            obrEtaTermino, 
            obrEtaDescricao,
            obrEtaIdResp,
            obrEtaEntrega,
            obrEtaDatFisc,
            obrEtaIdFisc,
            obrEtaStatus
        });
           
        return response.json({etapas});
    },

    async updObra(request, response) {
        let id = request.params.obrId;

        const {obrNome, obrDescricao, obrLogradouro, obrNumero, obrComplemento, obrBairro, obrCidade, obrUf, obrCep, obrSecretaria, obrContrato, obrUrlContrato, obrInicio, 
            obrPreTermino, obrEntrega, obrStatus, obrVlrContrato, obrVlrAditivo, obrVlrTotal, obrVlrPago, obrMotCancela, obrResCancela, obrDatReinicio, obrTotEtapas} = request.body;
        
        const [obrId] = await connection('obras')
        .where('obrId', id)
        .update({
            obrNome, 
            obrDescricao, 
            obrLogradouro, 
            obrNumero, 
            obrComplemento, 
            obrBairro, 
            obrCidade, 
            obrUf, 
            obrCep, 
            obrSecretaria, 
            obrContrato,
            obrUrlContrato, 
            obrInicio, 
            obrPreTermino,
            obrEntrega, 
            obrStatus, 
            obrVlrContrato, 
            obrVlrAditivo, 
            obrVlrTotal, 
            obrVlrPago, 
            obrMotCancela, 
            obrResCancela, 
            obrDatReinicio,
            obrTotEtapas
        });
           
        return response.json({obrId});
    },

    async updEtapas(request, response) {
        let etaId = request.params.obrEtaId;
        let obrId = request.params.obrEtaIdObra;

        const {obrEtaNome, 
            obrEtaInicio, 
            obrEtaPrevisao, 
            obrEtaTermino, 
            obrEtaDescricao,
            obrEtaIdResp,
            obrEtaEntrega,
            obrEtaDatFisc,
            obrEtaIdFisc, 
            obrEtaStatus } = request.body;

        const [etapas] = await connection('obrEtapas')
        .where('obrEtaId', etaId)
        .where('obrEtaIdObra', obrId)
        .update({
            obrEtaNome, 
            obrEtaInicio, 
            obrEtaPrevisao, 
            obrEtaTermino, 
            obrEtaDescricao,
            obrEtaIdResp,
            obrEtaEntrega,
            obrEtaDatFisc,
            obrEtaIdFisc,
            obrEtaStatus
        });
           
        return response.json({etapas});
    },
};

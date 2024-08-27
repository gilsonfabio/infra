const connection = require('../database/connection');
require('dotenv/config');

module.exports = {       
    
    async index (request, response) {
        let id = request.params.idObr;

        const diarios = await connection('obrDiario')
        .where('diaObrId', id)
        .orderBy('diaData', 'desc')
        .select('*');
    
        return response.json(diarios);
    },

    async busDiario (request, response) {
        let id = request.params.idDia;

        const diario = await connection('obrDiario')
        .join('obras', 'obrId', 'obrDiario.diaObrId')
        .where('diaId', id)
        .select(['obrDiario.*', 'obras.obrPreTermino']);
    
        return response.json(diario);
    },

    async create(request, response) {
        const {
            diaObrId, 
            diaData, 
            diaHora, 
            diaIniHorTrab, 
            diaFinHorTrab, 
            diaIniHorInter, 
            diaFinHorInter, 
            diaCndTmpManha, 
            diaCndTmpTarde, 
            diaObservacoes, 
            diaComentarios, 
            diaIdResDiario, 
            diaIdFisDiario} = request.body;
        
        let status = 'A';

        const [diaId] = await connection('obrDiario').insert({
            diaObrId, 
            diaData, 
            diaHora, 
            diaIniHorTrab, 
            diaFinHorTrab, 
            diaIniHorInter, 
            diaFinHorInter, 
            diaCndTmpManha, 
            diaCndTmpTarde, 
            diaObservacoes, 
            diaComentarios, 
            diaIdResDiario, 
            diaIdFisDiario,
            diaStatus: status
        });
           
        return response.json({diaId});
    },
    
    async updDiario(request, response) {
        let id = request.params.IdDia;
        const {
            diaObrId, 
            diaData, 
            diaHora, 
            diaIniHorTrab, 
            diaFinHorTrab, 
            diaIniHorInter, 
            diaFinHorInter, 
            diaCndTmpManha, 
            diaCndTmpTarde, 
            diaObservacoes, 
            diaComentarios, 
            diaIdResDiario, 
            diaIdFisDiario} = request.body;
        
        const [diaId] = await connection('obrDiario')
        .where('diaId', id)
        .update({
            diaObrId, 
            diaData, 
            diaHora, 
            diaIniHorTrab, 
            diaFinHorTrab, 
            diaIniHorInter, 
            diaFinHorInter, 
            diaCndTmpManha, 
            diaCndTmpTarde, 
            diaObservacoes, 
            diaComentarios, 
            diaIdResDiario, 
            diaIdFisDiario
        });
           
        return response.json({diaId});
    },   

    // Atividades.....

    async diaAtividades (request, response) {
        let id = request.params.idDia;

        const diaAtiv = await connection('diaAtividades')
        .join('obrAtividades', 'atvId', 'diaAtividades.dtvAtvId')
        .where('dtvDiaId', id)
        .select(['diaAtividades.*', 'obrAtividades.atvDescricao']);
    
        return response.json(diaAtiv);
    },

    async diaAtiInsert (request, response) {
        const {dtvDiaId, dtvAtvId, dtvAtvStatus} = request.body;

        const [dtvId] = await connection('diaAtividades').insert({
            dtvDiaId, 
            dtvAtvId, 
            dtvAtvStatus
        });
           
        return response.json({dtvId});
    },

    async diaAtiUpdate (request, response) {
        const {dtvDiaId, dtvAtvId, dtvAtvStatus} = request.body;

        const [dtvId] = await connection('diaAtividades')
        .where('dtvId', id)
        .update({
            dtvDiaId, 
            dtvAtvId, 
            dtvAtvStatus
        });
           
        return response.json({dtvId});
    },

    //Equipamentos.....
    //`deqId`, `deqDiaId`, `deqEquId`, `deqEquQtd`, `deqStatus`

    async diaEquipamentos (request, response) {
        let id = request.params.idDia;

        const diaEquip = await connection('diaEquipamentos')
        .join('obrEquipamentos', 'equId', 'diaEquipamentos.deqEquId')
        .where('deqDiaId', id)
        .select('*');
    
        return response.json(diaEquip);
    },

    async diaEquInsert (request, response) {
        const {deqDiaId, deqEquId, deqEquQtd } = request.body;
        let status = "A";

        const [deqId] = await connection('diaEquipamentos').insert({
            deqDiaId, 
            deqEquId,
            deqEquQtd, 
            deqAtvStatus: status
        });
           
        return response.json({deqId});
    },

    async diaEquUpdate (request, response) {
        const {deqDiaId, deqEquId, deqEquQtd, deqEquStatus} = request.body;

        const [dtvId] = await connection('diaEquipamentos')
        .where('deqId', id)
        .update({
            deqDiaId, 
            deqEquId,
            deqEquQtd, 
            deqEquStatus
        });
           
        return response.json({dtvId});
    },

    // Colaboradores.....
    //`dcbId`, `dcbDiaId`, `dcbColId`, `dcbColQtd`, `dcbStatus`

    async diaColab (request, response) {
        let id = request.params.idDia;

        const diaColab = await connection('diaColab')
        .join('obrCargos', 'crgId', 'diaColab.dcbColId')
        .where('dcbDiaId', id)
        .select(['diaColab.*', 'obrCargos.crgDescricao']);
    
        return response.json(diaColab);
    },

    async diaColInsert (request, response) {
        const {dcbDiaId, dcbColId, dcbColQtd } = request.body;
        let status = "A";

        const [dcbId] = await connection('diaColab').insert({
            dcbDiaId, 
            dcbColId,
            dcbColQtd, 
            dcbStatus: status
        });
           
        return response.json({dcbId});
    },

    async diaColUpdate (request, response) {
        const {dcbDiaId, dcbColId, dcbColQtd, dcbStatus} = request.body;

        const [dcbId] = await connection('diaColab')
        .where('dcbId', id)
        .update({
            dcbDiaId, 
            dcbColId,
            dcbColQtd, 
            dcbStatus
        });
           
        return response.json({dcbId});
    },
};

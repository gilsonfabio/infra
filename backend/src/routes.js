const express = require('express');
const jwt = require('jsonwebtoken');

const routes = express.Router();

const UsersController = require('./controllers/UsersController');
const ObrasController = require('./controllers/ObrasController');
const SecretariasController = require('./controllers/SecretariasController');
const ResponsaveisController = require('./controllers/ResponsaveisController');
const DiariosController = require('./controllers/DiariosController');
const CargosController = require('./controllers/CargosController');
const AtividadesController = require('./controllers/AtividadesController');
const EquipamentosController = require('./controllers/EquipamentosController');

routes.get('/', (request, response) => {
    response.json({
        message: 'Bem-vindo ao servidor Innvento!',
    });
});

function verifyJWT(req, res, next){
    //console.log('verificando token...')
    const token = req.headers["x-access-token"];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.'});

    jwt.verify(token, process.env.SECRET_JWT, (err, userInfo) => {
        if (err) {
           return res.status(403).send({ auth: false, message: 'Token invalid!'});
        }                
        next();            
    });
}

async function verifyRefreshJWT(req, res, next){
    //console.log('verificando refresh token...')
    const refreshTokenJWT = req.headers["x-access-token"];
    if (!refreshTokenJWT) return res.status(401).send({ auth: false, message: 'No refresh token provided.' });
    
    jwt.verify(refreshTokenJWT, process.env.SECRET_JWT_REFRESH, (err, userInfo) => {
        if (err) {
           return res.status(403).send({ auth: false, message: 'Refresh Token invalid!' });
        }
        next();            
    });
}

routes.post('/refreshToken', verifyRefreshJWT, UsersController.refreshToken);

routes.post('/signIn', UsersController.signIn);
routes.get('/users', UsersController.index);
routes.post('/newuser', UsersController.create);

routes.get('/obras', ObrasController.index);
routes.post('/newObra', ObrasController.create);
routes.put('/updObra/:obrId', ObrasController.updObra);
routes.get('/searchObra/:idObr', ObrasController.searchObra);
routes.get('/totObras/:status', ObrasController.totObras);

routes.get('/etapas/:idObr', ObrasController.etapas);
routes.post('/newEtapa', ObrasController.createEtapa);
routes.put('/updEtapa/:obrId/:etaId', ObrasController.updEtapas);
routes.get('/searchEtapa/:idObr/:idEta', ObrasController.searchEtapa);

routes.get('/secretarias', SecretariasController.index);
routes.post('/newSecretaria', SecretariasController.create);
routes.put('/updSecretaria/:secId', SecretariasController.updSecretaria);

routes.get('/responsaveis', ResponsaveisController.index);
routes.post('/newResponsavel', ResponsaveisController.create);
routes.put('/updResponsavel/:resId', ResponsaveisController.updResponsavel);

routes.get('/diarios/:idObr', DiariosController.index);
routes.post('/newdiario', DiariosController.create);
routes.put('/updDiario/:idDia', DiariosController.updDiario);
routes.get('/busDiario/:idDia', DiariosController.busDiario);

routes.get('/atividades', AtividadesController.index);
routes.post('/newatividade', AtividadesController.create);
routes.put('/updAtividade/:idAtv', AtividadesController.updAtividade);
routes.get('/searchAtividade/:idAtv', AtividadesController.searchAtividade);

routes.get('/atividades', CargosController.index);
routes.post('/newcargo', CargosController.create);
routes.put('/updCargo/:idCar', CargosController.updCargo);

routes.get('/equipamentos', EquipamentosController.index);
routes.post('/newequipamento', EquipamentosController.create);
routes.put('/updEquipamento/:idEqu', EquipamentosController.updEquipamento);

module.exports = routes;

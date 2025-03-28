const express = require('express');
const routes = express.Router();

const controllerAlunos = require('./controllers/controllerAlunos');
const controllerAtividades = require('./controllers/controllerAtividades');
const controllerTelefones = require('./controllers/controllerTelefones');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Escola ACME' });
});


routes.post('/alunos', controllerAlunos.create);
routes.get('/alunos', controllerAlunos.read);
routes.get('/alunos/:ra', controllerAlunos.readOne);
routes.put('/alunos/:ra', controllerAlunos.update);
routes.delete('/alunos/:ra', controllerAlunos.remove);


routes.post('/atividades', controllerAtividades.create);
routes.get('/atividades', controllerAtividades.read);
routes.get('/atividades/:id', controllerAtividades.readOne);
routes.put('/atividades/:id', controllerAtividades.update);
routes.delete('/atividades/:id', controllerAtividades.remove);
routes.post('/atividades/:id/calcular-parcial', controllerAtividades.calcularParcial);


routes.post('/telefones', controllerTelefones.create);
routes.get('/telefones', controllerTelefones.read);
routes.get('/telefones/:id', controllerTelefones.readOne);
routes.put('/telefones/:id', controllerTelefones.update);
routes.delete('/telefones/:id', controllerTelefones.remove);

module.exports = routes;
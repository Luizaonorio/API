import express from 'express';
import PeopleController from '../controllers/peopleController.js';

const router = express.Router();

router
    .get('/api/v1/user', PeopleController.listPeople)
    .get('/api/v1/user/:id', PeopleController.listPeopleById)
    .get('/api/v1/user/search', PeopleController.listPeopleByName)
    .post('/api/v1/user', PeopleController.registerPeople)
    .put('/api/v1/user/:id', PeopleController.updatePeople)
    .delete('/api/v1/user/:id', PeopleController.deletePeople)

export default router;
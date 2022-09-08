import express from 'express';
import people from './peopleRoutes.js'

const routes = (app) => {
    app.route('/api/v1').get((req, res) => {
        res.status(200).send({ Project: "Back-end" });
    })

    app.use(express.json(), people)
}

export default routes;
import express from 'express';
import people from './peopleRoutes.js'

const routes = (app) => {
    app.route('/api/v1').get((req, res) => {
        res.status(200).send({ Project: "Back-end" });
    })

    // app.route('/api/v1/user').get((req, res) => {
    //     res.status(200).send('To see the users you must use /api/v1/user?page=num&limit=num')
    // })

    app.use(express.json(), people)
}

export default routes;
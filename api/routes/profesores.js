var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
    models.profesor
        .findAll({
            attributes: ["id", "nombre"]
        })
        .then(profesores => res.send(profesores))
        .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
    models.profesor
        .create({ nombre: req.body.nombre })
        .then(profesor => res.status(201).send({ id: profesor.id }))
        .catch(error => {
            if (error == "SequelizeUniqueConstraintError: Validation error") {
                res.status(400).send('Bad request: existe otra profesor con el mismo nombre')
            }
            else {
                console.log(`Error al intentar insertar en la base de datos: ${error}`)
                res.sendStatus(500)
            }
        });
});

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
    models.profesor
        .findOne({
            attributes: ["id", "nombre"],
            where: { id }
        })
        .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
        .catch(() => onError());
};

router.get("/:id", (req, res) => {
    findProfesor(req.params.id, {
        onSuccess: materia => res.send(materia),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
});

router.put("/:id", (req, res) => {
    const onSuccess = profesor =>
        profesor
            .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
            .then(() => res.sendStatus(200))
            .catch(error => {
                if (error == "SequelizeUniqueConstraintError: Validation error") {
                    res.status(400).send('Bad request: existe otra profesor con el mismo nombre')
                }
                else {
                    console.log(`Error al intentar actualizar la base de datos: ${error}`)
                    res.sendStatus(500)
                }
            });
    findProfesor(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
});

router.delete("/:id", (req, res) => {
    const onSuccess = profesor =>
        profesor
            .destroy()
            .then(() => res.sendStatus(200))
            .catch(() => res.sendStatus(500));
    findProfesor(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
});

module.exports = router;
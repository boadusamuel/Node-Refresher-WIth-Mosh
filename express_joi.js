const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())


const genres = [{
    id: 1,
    name: "Action"
}, {
    id: 2,
    name: "Drama"
}, {
    id: 3,
    name: "Animation"
}, {
    id: 4,
    name: "Children"
}, {
    id: 5,
    name: "Comedy"
}, {
    id: 6,
    name: "Thriller"
}, {
    id: 7,
    name: "Romance"
}, {
    id: 8,
    name: "War"
}, {
    id: 9,
    name: "Horror"
}, {
    id: 10,
    name: "Documentary"
}]

app.get('/genres', (req, res) => {
    res.send(genres)
})

app.get('/:id', (req, res) => {

        if (req.params.id) {
            const genre = genres.find((genre) => genre.id === parseInt(req.params.id))
            if (genre)  res.send(genre)
            res.status(404).send('genre not found');
        }
        res.status(400).send('Bad Request')
    }
)

app.post('/genres', (req, res) => {
    if (!errorResponse(validateGenre(req.body.name), res)) {
        const id = genres.length + 1
        const genre = {id: id, name: req.body.name}
        genres.push(genre)
        res.send(genre)
    }
})

app.put('/genres/:id', (req, res) => {

    if (!errorResponse(validateGenre(req.body.name), res)) {
        const genre = genres.find((genre) => genre.id === parseInt(req.params.id))

        genre.name = req.body.name

        genres.push(genre)
        res.send(genre)
    }
})

app.delete('/genres/:id', (req, res) => {
    if (!errorResponse(validateGenre(req.body.name), res)) {

        const index = genres.findIndex((genre) => genre.id === parseInt(req.params.id))

        genres.splice(index, 1)

        res.send("Deleted")
    }
})



function validateGenre(request) {

    const schema = Joi.object({name: Joi.string().required().min(3)})

    const {error} = schema.validate({name: request})

    if (error) return error.details[0].message
}

function errorResponse(errorMessage, res) {
    if (errorMessage) return res.status(404).send(errorMessage)
}


const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Example app listening on port ${port}`))

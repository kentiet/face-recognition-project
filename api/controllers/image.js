const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'a130d7cd2b35429ea59c17e5ebe6f778'
    // apiKey: 'YOUR API KEY'
});

const handleApiCall = (req , res) => {
    app.models
    .predict('53e1df302c079b3db8a0a36033ed2d15', req.body.id)
    .then(data => {
        console.log(data)
        res.json(data)
    })
    .catch(err => res.status(400).json('cant work with api'))
}

const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to count'))
}

module.exports = {
    handleImage,
    handleApiCall
}
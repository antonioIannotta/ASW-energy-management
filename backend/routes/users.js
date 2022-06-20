const router = require('express').Router();
let User = require('../models/user.model');

router.get('/', async (req, res) => {          
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/insert', (req, res) => {
    const username = req.body.username;
    const fiscalCode = req.body.fiscalCode;
    const city = req.body.city;
    const email = req.body.email;
    const password = req.body.password;
    const region = req.body.region;
    const id = req.body._id;
    const waterUsage = req.body.waterUsage;
    const electricUsage = req.body.electricUsage;
    const heatUsage = req.body.heatUsage;

    const newUser = new User({
        "_id": id,
        "username": username,
        "fiscalCode": fiscalCode,
        "city": city,
        "region": region,
        "email": email,
        "password": password,
        "electricUsage": electricUsage,
        "heatUsage": heatUsage,
        "waterUsage": waterUsage
    });

    newUser.save()
    .then(() => console.log("User added!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/insertElectricUsage/:id/', (req, res) => {    
    User.findById(req.params.id)
        .then(user => {            
            user.electricUsage.push(
                req.body.electricUsage                     
            );
            user.save()
                .then(() => res.json('Electric usage updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/insertHeatUsage/:id/', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.heatUsage.push(
                req.body.heatUsage         
            );
            user.save()
                .then(() => res.json('Heat usage updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/insertWaterUsage/:id', (req, res) => {     
    User.findById(req.params.id)
        .then(user => {
            user.waterUsage.push(
                req.body.waterUsage
            );
            user.save()
                .then(() => res.json('Water usage updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getByCity/', (req, res) => {    

    User.filter({ "city": req.body.city })
    .then(users => {
        //let usersByCity = users.filter(user => user.city === req.body.city);
        res.json(users);  
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getByRegion', (req, res) => {
    User.find()
    .then(users => {
        let usersInRegion = users.filter(user => user.region === req.body.region);
        res.json(usersInRegion);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
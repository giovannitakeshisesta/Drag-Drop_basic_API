const createError = require('http-errors')
const List = require('../models/List.model')
const DNDList = require('../models/DNDList.model')
const DNDmultiple = require('../models/DNDmultiple.model')

//----------------------------------------------------------//
// CREATE AN ARRAY OR AN OBJECT OF ARRAYS WHERE WE WILL PUSH IDS
// to do once, only the first time by making a post request to http://localhost:3002/api/dndlist
module.exports.createDND = (req, res, next) => {
    DNDList.create({xxx:[]})
        .then( response => res.status(201).json(response) )
        .catch(next)
}

// to do once, only the first time by making a post request to http://localhost:3002/api/dndmultiple
module.exports.createDNDmultiple = (req, res, next) => {
    DNDmultiple.create({col1:{xxx:[]}, col2:{xxx:[]}, col3:{xxx:[]}})
        .then( response => res.status(201).json(response) )
        .catch(next)
}

//----------------------------------------------------------//
// when we create a new name, we also push the id of the new name inside 2 arrays of IDs (single/multiple)
module.exports.create = (req, res, next) => {
    List.create(req.body)
        .then((element) => { 
        return (
            //  single
            DNDList.findOneAndUpdate({}, { "$push": { "xxx": element.id }}, { new: true })
            //  multiple  
            .then(()=> DNDmultiple.findOneAndUpdate({}, { "$push": { "col1.xxx": element.id }}, { new: true }))
            .then(response => { res.status(201).json(response) })
        )
    })
    .catch(next)
}

//----------------------------------------------------------//
// GET ALL NAMES AND IDS
module.exports.find = (req, res, next) => {
    List.find()
        .then(response => res.status(201).json(response))
        .catch(next)
}


// SINGLE : GET ARRAY OF IDS
module.exports.findDND = (req, res, next) => {
    console.log("dentro controller findDND() ");
    DNDList.find()
    .populate('xxx')
    .then(response => res.status(201).json(response[0].xxx))
    .catch(next)
}

// MULTIPLE : GET OBJECT WITH ARRAYS OF IDS
module.exports.findDNDmultiple = (req, res, next) => {
    const populateOptions = (eachColumn) => {
        return ({
            path: eachColumn,
            populate: {
                path: 'xxx',
                model: 'List'
            }
        })
    }
    DNDmultiple.find()
    .populate(populateOptions("col1"))
    .populate(populateOptions("col2"))
    .populate(populateOptions("col3"))
    .then(response => res.status(200).json(response))
    .catch(next)
}

//----------------------------------------------------------//
// SINGLE : UPDATE ARRAY OF IDS
module.exports.patchDND = (req,res, next) => {
    DNDList.findOneAndUpdate({},{"xxx":req.body}, {new:true})
    .then(response => res.status(200).json(response))
    .catch(next)
}

// MULTIPLE : UPDATE OBJECT WITH ARRAYS OF IDS
module.exports.patchDNDmultiple = (req,res, next) => {
    DNDmultiple.findOneAndUpdate({}, req.body, {new:true})
    .then(response => res.status(200).json(response))
    .catch(next)
}
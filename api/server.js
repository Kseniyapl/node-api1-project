const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json()) 


server.get('/api/users', (req, res)=>{
    User.find()
    .then(users=>{
        res.json(users)
    })
    .catch(err=>{
        res.status(500).json({
            message:"The users information could not be retrieved",
            error: err.message})
        })
    })

server.post('/api/users', (req, res )=>{
  const { name, bio} = req.body;
        if(!name || !bio){
            res.status(400).json({
            message: "Please provide name and bio for the user"})
        }else{
            User.insert(req.body)
            .then(newUser =>{
                res.status(201).json(newUser)})
            .catch(err=>{
            res.status(500).json({
            message:"error getting users",
            error: err.message})
        })
    }
})  

server.get('/api/users/:id', (req, res)=>{

    User.findById(req.params.id)
    .then(user=>{
        if(!user){
            res.status(404).json({
            message: "The user with the specified ID does not exist"}) 
        }else{
          res.json(user) 
        } 
    })
    .catch(err=>{
        res.status(500).json({
            message:"The users information could not be retrieved",
            error: err.message})
        })
    })

server.delete('/api/users/:id', async (req, res)=>{
const deletedUser = await User.findById(req.params.id)
try{
    if(!deletedUser) {
        res.status(404).json({
        message: "The user with the specified ID does not exist" })
    }else{
        const user = await User.remove(deletedUser.id)
        res.status(200).json(user)
    }
}
catch(err){
    res.status(500).json({
    message: "The users information could not be retrieved",
    error: err.message
     })
    }
})

server.put('/api/users/:id', async(req, res) =>{
   
    try{
        const { id } = req.params
        const { name, bio } = req.body
        if(!name||!bio){
            res.status(400).json({message: "Please provide name and bio for the user"})
        }else{
            const count = await User.findById(id)
            if(!count){
                res.status(404).json({
                message: "The user with the specified ID does not exist"
            })  
            }else{
                const updatedUser= await User.update(id, { name, bio })
            res.status(200).json(updatedUser)
        }
    }
}
    catch(err){
        res.status(500).json({
            message: "The user information could not be modified",
            error: err.message
        }) 
    } 

})

module.exports = server; // EXPORT YOUR SERVER instead of {}

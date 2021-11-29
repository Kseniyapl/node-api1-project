// IMPORTS AT THE TOP
const express = require('express')
const User = require('./users/model')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())



// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get('/hello', (req, res)=>{
    res.json({message:"hello"})
})

//| GET    | /api/users     | Returns an array users.     

// server.get('/api/users', (req, res)=>{
//     User.find()
//     .then(users=>{
//         res.json(users)
//     })
//     .catch(err=>{
//         res.status(500).json({
//             message:"The users information could not be retrieved",
//             error: err.message})
//         })
//     })

server.get('/api/users', async (req, res)=>{  
    try{
        const users = await User.find()
        res.json(users)
    }
   catch(err){
        res.status(500).json({
            message: "The users information could not be retrieved",
            error: err.message
        })
    }
})
 

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.   

server.post('/api/users', async (req, res )=>{
    try{
        if(!req.body.name || !req.body.bio){
            res.status(400).json({
                message:"provide name and bio"
            })
        }else{
            const newUser = await User.insert(req.body)
            res.status(201).json(newUser)
        }
    }catch(err){
        res.status(500).json({
            message:"error getting users",
            error: err.message
        }) 
    } 
})
// | GET    | /api/users/:id | Returns the user object with the specified `id`.  

server.get('/api/users/:id', async(req, res)=>{
    try{
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
    else{
        res.json(user)
    }
    }catch(err){
        res.status(500).json({
            message:"error getting users by id",
            error: err.message
        }) 
    }
})
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

module.exports = server; // EXPORT YOUR SERVER instead of {}

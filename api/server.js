// IMPORTS AT THE TOP
const express = require('express')
const User = require('./users/model')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json()) //this is for post user, dosnt know how to parse



// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get('/hello', (req, res)=>{
    res.json({message:"hello"})
})

//| GET    | /api/users     | Returns an array users.     

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

// server.get('/api/users', async (req, res)=>{  
//     try{
//         const users = await User.find()
//         res.json(users)
//     }
//    catch(err){
//         res.status(500).json({
//             message: "The users information could not be retrieved",
//             error: err.message
//         })
//     }
// })
 

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.   

server.post('/api/users', (req, res )=>{
  const user = req.body;
        if(!user.name || !user.bio){
            res.status(400).json({
            message: "Please provide name and bio for the user"
            })
        }else{
            User.insert(user)
            .then(newUser =>{
                res.status(201).json(newUser)
            })
            .catch(err=>{
            res.status(500).json({
            message:"error getting users",
            error: err.message
            })
        })
    }
})

// | GET    | /api/users/:id | Returns the user object with the specified `id`.  

server.get('/api/users/:id', (req, res)=>{
    User.findById(req.params.id)
    .then(user=>{
        if(!user){
            console.log(user)
            res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    } res.json(user)
    })
    .catch(err=>{
        res.status(500).json({
            message:"The users information could not be retrieved",
            error: err.message})
        })
    })




// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.          

server.delete('/api/users/:id', async (req, res)=>{
const deletedUser = await User.findById(req.params.id)
try{
    if(!deletedUser) {
        res.status(404).json({
        message: "Please provide name and bio for the user"     
        })
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

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

server.put('/api/users/:id', async(req, res) =>{
    const { id } = req.params
    const { body } = req
    try{
        const updatedUser = await User.update(id, body)
        if(!updatedUser){
            res.status(404).json({
            message: "There was an error while saving the user to the database"
            })
        }  
        else{
            res.json(updatedUser)
        }
    }catch(err){
        res.status(500).json({
            message: "The users information could not be retrieved" ,
            error: err.message
        }) 
    } 

})

module.exports = server; // EXPORT YOUR SERVER instead of {}

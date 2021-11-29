// IMPORTS AT THE TOP
const express = require('express')
const User = require('./users/model')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
//server.use(express.json())



// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get('/hello', (req, res)=>{
    res.json({message:"hello"})
})

//| GET    | /api/users     | Returns an array users.     

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

// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

module.exports = server; // EXPORT YOUR SERVER instead of {}

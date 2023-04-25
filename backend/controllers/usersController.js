import { User, validateUser } from '../models/User.js'
import bcrypt from 'bcrypt'
import _ from 'lodash'

//Purpose: register a new user
//Access: public
export async function registerUser(req, res) {
    //Validate the user input using joi
    const { error } = validateUser(req.body)
    if (error) {
        let messages = []
        error.details.forEach((detail) => messages.push(detail.message))
        return res.status(400).send(messages.join('\n'))
    }

    //Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
        return res.status(400).send('User already exists.')
    }

    //If the user is new, add them to the db
    let newUser = new User(_.pick(req.body, ['name', 'email', 'password']))

    //Hash the provided password before sving in the db
    try {
        newUser.password = await bcrypt.hash(newUser.password, 10)
    } catch (error) {
        console.log('Hashed password not created', error)
        return
    }

    //Save the new user in the db
    newUser = await newUser.save()
    return res.send(_.pick(newUser, ['_id', 'name', 'email']))
}

//Purpose: log in a user
//Access: public
export async function loginUser(req, res) {
    res.send('Login user.')
}

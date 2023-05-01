import { User, validateUser, validateEmailAndPassword } from '../models/User.js'
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
        res.status(400)
        throw new Error('User already exists.')
    }

    //If the user is new, add them to the db
    let newUser = new User(_.pick(req.body, ['name', 'email', 'password']))

    //Hash the provided password before saving in the db
    try {
        newUser.password = await bcrypt.hash(newUser.password, 10)
    } catch (error) {
        console.log('Hashed password not created', error)
        return
    }

    //Save the new user in the db
    //Status 201 as a new user's been added
    newUser = await newUser.save()

    //Generate & return a jwt for the new user
    const token = newUser.generateAuthToken()
    const newUserInfo = _.pick(newUser, ['_id', 'name', 'email'])
    return res.status(201).json({ ...newUserInfo, token })
}

//Purpose: log in a user and send an auth token
//Access: public
export async function loginUser(req, res) {
    //Check that the credentials provided are formatted correctly: client side validation
    const { error } = validateEmailAndPassword(req.body)
    if (error) {
        let messages = []
        error.details.forEach((detail) => messages.push(detail.message))
        return res.status(400).send(messages.join('\n'))
    }

    const user = await User.findOne({ email: req.body.email })

    //Confirm that the user exists and the password entered is correct
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const token = user.generateAuthToken()
        const userInfo = _.pick(user, ['_id', 'name', 'email'])
        return res.send({ ...userInfo, token })
    } else {
        res.status(401)
        throw new Error('Invalid login details.')
    }
}

export async function getCurrentUser(req, res) {
    //Populate the current user object using the user doc obtained from the authorized middleware
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    }

    return res.send(user)
}

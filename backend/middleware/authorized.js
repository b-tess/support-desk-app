import 'express-async-errors'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export default async function authorized(req, res, next) {
    let token

    //authorization is a property available in the headers object
    //A token can be put in this authorization property as the value: Bearer <token>
    //This token can then be accessed using the 'split' string method that returns an array
    //Check if a token is available for the proteceted route
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //Get the token from the header
            token = req.headers.authorization.split(' ')[1]

            //Get the decoded token if a valid one is provided
            const decoded = jwt.verify(token, process.env.JWT_SECRETKEY)

            //Get the user linked to the token
            req.user = await User.findById(decoded._id).select('-password')
            // console.log(typeof req.user.id)
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized.')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized. No token provided.')
    }
}

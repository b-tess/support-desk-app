import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import 'express-async-errors'

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
            next()
        } catch (error) {
            return res.status(401).send('Not authorized.')
        }
    } else {
        return res.status(401).send('Not authorized. No token provided.')
    }
}

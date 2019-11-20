import jwt from 'jsonwebtoken'
import authConfig from '../../authConfig'

 function  auth(req, res, next) {
     
    const { authorization } = req.headers 
    const [, token] = authorization.split(' ')
    
    if(!authorization) { 
            return res
                    .status(400)
                    .send('Access Denied! Token not found!')
                    .json({ error: 'Access Denied! Token not found!'})
    }
    
    try {
        const decoded = jwt.verify(token, authConfig.secret)
        if( !decoded ) { 
            res
                .status(400)
                .send('Access Denied! Token not found!')
                .json({ error: 'Access Denied! Expired Token!'})
        }

        req.userId = decoded.id
        next()

    } catch(err) {
        res
            .status(400)
            .send('Invalid Token')
    }
}

export default auth
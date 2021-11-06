const jwt = require( 'jsonwebtoken' );

const authenticate = ( req, res, next ) => {
    const token = req.header( 'Authorization' );

    if( !token ) {
        const error = new Error( 'Token is not sent' );
        error.status = 401;
        return next( error );
    }
    
    // 'abcd' is the secret key - please store this in process.env.* where * is some environment variable like JWT_SECRET (say)
    jwt.verify( token, 'abcd', async ( err, claims ) => {
        if( err ) {
            const error = new Error( 'Go away intruder' );
            error.status = 403;
            return next( error );
        }

        // res.locals ({}) is used to share information between one middleware and another
        res.locals.claims = claims;

        next();
    });
};

const authorize = ( roles ) => {
    return ( req, res, next ) => {
        const { role } = res.locals.claims;

        if( !roles.includes( role ) ) {
            const error = new Error( 'You do not have the required privileges' );
            error.status = 403;
            return next( error );
        }

        next();
    };
};

module.exports = {
    authenticate,
    authorize
};
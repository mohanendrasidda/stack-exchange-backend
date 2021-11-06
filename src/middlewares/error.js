const errorHandler = ( error, req, res, next ) => {
    res.status( error.status || 500 );
    res.json({
        status: 'error',
        message: error.message
    });
};

module.exports = errorHandler;
const notFound = (req, res, next) => {
    let error = new Error(`Page Not Found For the requested URL -${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || 'Internal Server Error';

    if (err.name === 'CasteError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found'
    }

    res.status(statusCode).json({
        message,
        success: false,
        statusCode,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export { notFound, errorHandler }
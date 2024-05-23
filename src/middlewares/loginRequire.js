module.exports = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).send('Please log in to access this page');
    }
}
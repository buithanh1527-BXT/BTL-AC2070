const sessions = {}; // In-memory session store

exports.sessions = sessions;

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    
    const tokenStr = token.replace('Bearer ', '');
    const user = sessions[tokenStr];
    
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    
    req.user = user;
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Require Admin Role' });
    }
};

const User = require('../models/User'); // Import User model
const { createClerkClient } = require('@clerk/clerk-sdk-node');

// Lazy initialization of Clerk client to ensure environment variables are loaded
let clerk = null;
const getClerkClient = () => {
    if (!clerk) {
        clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }
    return clerk;
};

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify the session token using Clerk's secret key
            const decoded = await getClerkClient().verifyToken(token);
            
            // Get user details from Clerk to get the role from publicMetadata
            const clerkUser = await getClerkClient().users.getUser(decoded.sub);
            
            // Find user in MongoDB
            const dbUser = await User.findOne({ clerkId: clerkUser.id });

            if (dbUser) {
                req.user = dbUser;
            } else {
                // Fallback for new users before webhook sync
                req.user = {
                    _id: clerkUser.id, // Be careful, this is a string
                    clerkId: clerkUser.id,
                    name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : clerkUser.username,
                    email: clerkUser.emailAddresses[0]?.emailAddress,
                    role: clerkUser.publicMetadata?.role || 'customer'
                };
            }

            return next();
        } catch (error) {
            console.error('Clerk Authorization Error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, no user data' });
        }
        
        if (!roles.includes(req.user.role)) {
            console.log(`Role Forbidden: ${req.user.role} trying to access role-restricted route`);
            return res.status(403).json({
                message: `User role ${req.user.role} is not authorized to access this route`,
            });
        }
        next();
    };
};

module.exports = { protect, authorize };

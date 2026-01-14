const { createClerkClient } = require('@clerk/clerk-sdk-node');

// Lazy initialization
let clerk = null;
const getClerkClient = () => {
    if (!clerk) {
        clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }
    return clerk;
};

// @desc    Get all users (from Clerk)
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        console.log('Fetching users from Clerk...');
        const clerkUsers = await getClerkClient().users.getUserList();
        
        // Handle both PaginatedResourceResponse and direct Array response
        const userArray = Array.isArray(clerkUsers) ? clerkUsers : (clerkUsers.data || []);
        
        // Map Clerk users to our internal frontend format
        const mappedUsers = userArray.map(user => ({
            _id: user.id,
            id: user.id,
            name: user.username || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Anonymous',
            email: user.emailAddresses[0]?.emailAddress || 'No Email',
            role: user.publicMetadata?.role || 'customer',
            createdAt: user.createdAt
        }));

        res.json(mappedUsers);
    } catch (error) {
        console.error('Clerk Fetch Users Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user role in Clerk
// @route   PUT /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const userId = req.params.id;

        console.log(`Updating role for user ${userId} to ${role}`);

        // Update Clerk User's public metadata
        const updatedUser = await getClerkClient().users.updateUserMetadata(userId, {
            publicMetadata: {
                role: role
            }
        });

        res.json({
            _id: updatedUser.id,
            id: updatedUser.id,
            role: updatedUser.publicMetadata.role
        });
    } catch (error) {
        console.error('Clerk Update Metadata Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user from Clerk
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Prevent self-deletion
        if (userId === req.user.clerkId || userId === req.user.id) { // Check both to be safe
            return res.status(400).json({ message: 'You cannot delete yourself' });
        }

        await getClerkClient().users.deleteUser(userId);
        res.json({ message: 'User removed from Clerk' });
    } catch (error) {
        console.error('Clerk Delete User Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, updateUserRole, deleteUser };

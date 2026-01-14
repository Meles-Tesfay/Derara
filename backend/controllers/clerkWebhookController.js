const { Webhook } = require('svix');
const { createClerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

// Lazy initialization
let clerk = null;
const getClerkClient = () => {
    if (!clerk) {
        clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
    }
    return clerk;
};

exports.handleClerkWebhook = async (req, res) => {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error('Missing CLERK_WEBHOOK_SECRET');
        return res.status(500).json({ message: 'Webhook secret not configured' });
    }

    // Get the headers
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return res.status(400).json({ message: 'Missing svix headers' });
    }

    // Get the body
    const payload = req.body;
    const body = payload.toString();

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error('Error verifying webhook:', err.message);
        return res.status(400).json({ message: 'Verification failed' });
    }

    // Handle the event
    const eventType = evt.type;
    console.log(`Received webhook event: ${eventType}`);

    if (eventType === 'user.created') {
        const { id, email_addresses, first_name, last_name, username } = evt.data;
        const email = email_addresses[0]?.email_address;
        const name = first_name ? `${first_name} ${last_name || ''}`.trim() : username;

        console.log(`New User Created in Clerk: ${id} (${email})`);

        try {
            // Check if this is the first user to make them admin
            const userCount = await User.countDocuments({});
            const isFirstUser = userCount === 0;
            
            const role = isFirstUser ? 'admin' : 'customer';
            
            console.log(`Assigning role: ${role} to user: ${id}`);

            // Update Clerk Metadata
            await getClerkClient().users.updateUserMetadata(id, {
                publicMetadata: {
                    role: role
                }
            });

            // Create User in MongoDB
            const user = await User.create({
                clerkId: id,
                name,
                email,
                role
            });

            console.log(`Successfully synced user to MongoDB: ${user._id}`);
        } catch (error) {
            console.error('Error syncing user to MongoDB:', error.message);
        }
    } else if (eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, username, public_metadata } = evt.data;
        const email = email_addresses[0]?.email_address;
        const name = first_name ? `${first_name} ${last_name || ''}`.trim() : username;
        const role = public_metadata?.role;

        try {
            const user = await User.findOneAndUpdate(
                { clerkId: id },
                { 
                    name, 
                    email,
                    ...(role && { role }) // Update role if present
                },
                { new: true }
            );
            console.log(`Updated user in MongoDB: ${user?._id}`);
        } catch (error) {
             console.error('Error updating user in MongoDB:', error.message);
        }
    } else if (eventType === 'user.deleted') {
        const { id } = evt.data;
        try {
            await User.findOneAndDelete({ clerkId: id });
             console.log(`Deleted user from MongoDB: ${id}`);
        } catch (error) {
            console.error('Error deleting user from MongoDB:', error.message);
        }
    }

    res.status(200).json({ message: 'Webhook handled' });
};

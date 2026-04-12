const bcryptjs = require('bcryptjs');
const User = require('./models/user');

const seed = async () => {
    try {
        const email = process.env.ADMIN_EMAIL || 'admin@tutorme.com';
        const password = process.env.ADMIN_PASSWORD || 'admin123';
        const name = process.env.ADMIN_NAME || 'Admin';

        const exists = await User.findOne({ email });
        if (exists) {
            if (!exists.isAdmin) {
                await User.findByIdAndUpdate(exists._id, { isAdmin: true });
                console.log(`[seed] Existing user "${email}" promoted to admin`);
            } else {
                console.log(`[seed] Admin "${email}" already exists — skipping`);
            }
            return;
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        await User.create({
            email,
            password: hashedPassword,
            f_name: name,
            isAdmin: true,
            points: 0,
        });

        console.log(`[seed] Admin user created — email: ${email} | password: ${password}`);
    } catch (err) {
        console.error('[seed] Error running seed:', err.message);
    }
};

module.exports = seed;

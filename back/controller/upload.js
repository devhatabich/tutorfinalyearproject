const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET = process.env.AWS_S3_BUCKET;

exports.getPresignedUrl = async (req, res) => {
    try {
        const { filename, contentType } = req.query;
        if (!filename || !contentType) {
            return res.status(400).json({ error: 'filename and contentType are required' });
        }

        const ext = filename.split('.').pop();
        const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            ContentType: contentType,
        });

        const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 120 });
        const publicUrl = `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

        res.json({ presignedUrl, publicUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', message: err.message });
    }
};

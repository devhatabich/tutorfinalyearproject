/**
 * Uploads a file to AWS S3 via a backend-issued presigned URL.
 * Returns the public S3 URL of the uploaded file.
 */
export const uploadImage = async (file) => {
    if (!file) throw new Error('No file provided');

    // 1. Get presigned URL from backend
    const params = new URLSearchParams({
        filename: file.name,
        contentType: file.type,
    });
    const presignRes = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload/presign?${params}`,
        { credentials: 'include' }
    );
    if (!presignRes.ok) throw new Error('Could not get upload URL');
    const { presignedUrl, publicUrl } = await presignRes.json();

    // 2. PUT the file directly to S3
    const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
    });
    if (!uploadRes.ok) throw new Error('Upload to S3 failed');

    return publicUrl;
};

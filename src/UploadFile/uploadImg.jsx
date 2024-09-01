import axios from "axios";

export const uploadImg = async (file) => {
    const cloudName = 'dnvmj9pvk';
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'dikodu1v'); // Your unsigned upload preset

    try {
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        const res = await axios.post(api, data, {
            headers: {
                'Content-Type': 'multipart/form-data' // No Authorization header is included
            }
        });

        const { secure_url } = res.data;
        console.log(secure_url);
        return secure_url;
    } catch (error) {
        console.error('Upload failed:', error);
        return '';
    }
};

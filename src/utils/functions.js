import { upload } from "../api/requests";


export const uploadFile = async (user, file) => {
    const formData = new FormData();
    formData.append('token', user);
    formData.append('file', file);
  
    try {
      const response = await upload.post('misc/file-upload', formData);
  
      if (response.data.status === "success") {
        return response.data.file_url;
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error(error);
      throw new Error("File upload failed");
    }
  };
  
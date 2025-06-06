// src/api/uploadDataset.ts
import axios from 'axios';

interface UploadDatasetResponse {
  message: string;
}

 //change this to public_url of ngrok
export const AI_API_URL = 'https://6485-34-53-50-167.ngrok-free.app';

export const uploadDataset = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post<UploadDatasetResponse>(`${AI_API_URL}/api/upload-dataset`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.message;
  } catch (error: any) {
    throw error.response?.data?.error || error.message || 'Failed to upload dataset';
  }
};

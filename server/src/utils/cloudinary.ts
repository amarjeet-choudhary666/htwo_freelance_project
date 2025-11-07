import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary with explicit values
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ddjmghwji',
  api_key: process.env.CLOUDINARY_API_KEY || '174454949199128',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mcYwdb3wfMBOc3f8sivCiECq4vg',
});

// Upload file to Cloudinary
export const uploadToCloudinary = async (filePath: string, folder: string = 'partners'): Promise<string> => {
  try {
    console.log('Uploading to Cloudinary:', filePath);
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'auto',
    });
    
    console.log('Upload successful:', result.secure_url);
    
    // Clean up local file
    try {
      fs.unlinkSync(filePath);
    } catch (cleanupError) {
      console.warn('Failed to cleanup file:', cleanupError);
    }
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    // Clean up local file on error
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (cleanupError) {
      console.warn('Failed to cleanup file after error:', cleanupError);
    }
    
    throw new Error('Failed to upload image: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    console.log('File deleted from Cloudinary:', publicId);
  } catch (error) {
    console.error('Failed to delete from Cloudinary:', error);
    throw error;
  }
};

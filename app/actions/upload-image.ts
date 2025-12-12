'use server';

import { uploadToImageKit } from '@/lib/imagekit';

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = `${Date.now()}-${file.name}`;
    const url = await uploadToImageKit(file, fileName);

    return { success: true, url };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Failed to upload image' };
  }
}
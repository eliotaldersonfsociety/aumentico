import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function uploadToImageKit(file: File | Buffer, fileName: string): Promise<string> {
  try {
    let bufferData: Buffer;

    if (file instanceof File) {
      const buffer = await file.arrayBuffer();
      bufferData = Buffer.from(buffer);
    } else {
      bufferData = file;
    }

    const response = await imagekit.upload({
      file: bufferData,
      fileName: fileName,
      folder: '/blog-images',
    }) as any; // Type assertion for response

    return response.url;
  } catch (error) {
    console.error('Error uploading to ImageKit:', error);
    throw new Error('Failed to upload image');
  }
}

export default imagekit;
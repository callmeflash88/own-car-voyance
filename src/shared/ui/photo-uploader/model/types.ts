export interface UploadedPhoto {
  id: number;
  url: string;
}

export interface PhotoUploaderProps {
  uploadedPhotos: UploadedPhoto[];
  setUploadedPhotos: React.Dispatch<React.SetStateAction<UploadedPhoto[]>>;
}

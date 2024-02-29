import Document from "next/document";

export interface IImage extends Document {
  id: string;
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string | null;
  aspectRatio?: string | null;
  color?: string | null;
  prompt?: string | null;
  author: IUser;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  // Add other user properties if needed
}

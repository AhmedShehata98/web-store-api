export interface IUser {
  fullName: string;
  email: string;
  profileImageUrl: string | null;
  password: string;
  jobTitle: string;
  country: string;
  usedFramework: string;
  githubProfileUrl: string | null;
  linkedinProfileUrl: string | null;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

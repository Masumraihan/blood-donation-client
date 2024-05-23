export type TMyProfile = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  bloodType: string;
  location: string;
  role: string;
  isDonate: boolean;
  isRequest: boolean;
  status: string;
  availability: boolean;
  createdAt: string;
  updateAt: string;
  userProfile: {
    id: string;
    userId: string;
    photo: string | null;
    bio: string;
    age: number;
    lastDonationDate: string;
    createdAt: string;
    updateAt: string;
  };
};

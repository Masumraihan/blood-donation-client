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

export type TMyBloodInfo = {
  id: string;
  donorId: string;
  requesterId: string;
  phoneNumber: string;
  dateOfDonation: string;
  hospitalName: string;
  hospitalAddress: string;
  reason: string;
  requestStatus: string;
  createdAt: string;
  updateAt: string;
  donor?: TRequester;
  requester?: TRequester;
};

export type TRequester = {
  id: string;
  name: string;
  email: string;
  location: string;
  bloodType: string;
  availability: boolean;
};

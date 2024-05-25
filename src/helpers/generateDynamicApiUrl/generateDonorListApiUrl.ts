const generateDonorListApiURL = ({
  search,
  bloodType,
  availability,
}: {
  search?: string | null;
  bloodType?: string | null;
  availability?: string | null;
}) => {
  const params = new URLSearchParams();
  if (search) {
    params.set("searchTerm", search);
  }
  if (bloodType) {
    params.set("bloodType", bloodType);
  }
  if (availability) {
    params.set("availability", availability);
  }
  return `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/donor-list?limit=10&page=1&${params.toString()}`;
};

export default generateDonorListApiURL;

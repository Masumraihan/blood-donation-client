"use client";
import AccountMenu from "@/components/shared/Navbar/components/AccountMenu";
import { useGetMyProfileQuery } from "@/redux/featues/user/userApi";

const UserMenu = () => {
  const { data } = useGetMyProfileQuery({});
  console.log(data);

  return (
    <div>
      <AccountMenu data={data} />
    </div>
  );
};

export default UserMenu;

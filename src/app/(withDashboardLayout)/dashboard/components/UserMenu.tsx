"use client";
import AccountMenu from "@/components/shared/Navbar/components/AccountMenu";
import { useGetMyProfileQuery } from "@/redux/featues/user/userApi";

const UserMenu = () => {
  const { data } = useGetMyProfileQuery({});

  return (
    <div>
      <AccountMenu data={data} />
    </div>
  );
};

export default UserMenu;

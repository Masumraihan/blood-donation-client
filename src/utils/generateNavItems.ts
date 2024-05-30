const generateNavItems = (role: string) => {
  let navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
  ];

  switch (role) {
    case "ADMIN":
      navItems = [...navItems, { name: "Dashboard", link: "/dashboard" }];
      break;
    default:
      break;
  }

  return navItems;
};
export default generateNavItems;

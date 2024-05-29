import { Button, Container } from "@mui/material";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container sx={{ p: "20px" }}>
      <Button LinkComponent={Link} href='/'>
        Back to home
      </Button>
      {children}
    </Container>
  );
};

export default AuthLayout;

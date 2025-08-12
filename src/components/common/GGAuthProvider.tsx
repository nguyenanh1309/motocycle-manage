import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GGAuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const clientId = process.env.GG_CLIENT_ID || ""
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
};

export default GGAuthProvider;

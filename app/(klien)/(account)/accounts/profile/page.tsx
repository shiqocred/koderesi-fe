import { Metadata } from "next";
import { Client } from "./_components/client";

export const metadata: Metadata = {
  title: "Profile Setting",
};

const ProfilePage = () => {
  return (
    <div>
      <Client />
    </div>
  );
};

export default ProfilePage;

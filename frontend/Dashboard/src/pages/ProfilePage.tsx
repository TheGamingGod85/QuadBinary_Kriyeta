
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProfileCard } from "@/components/dashboard/ProfileCard";

const ProfilePage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">User Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </header>

        <div className="max-w-2xl mx-auto">
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

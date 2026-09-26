import { getProfileContent } from "@/data/profile";
import { ProfileForm } from "./profile-form";

export default async function AdminProfilePage() {
  const profile = await getProfileContent();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight">Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">Shown in the hero and page metadata.</p>
      <div className="mt-6">
        <ProfileForm initial={profile} />
      </div>
    </div>
  );
}

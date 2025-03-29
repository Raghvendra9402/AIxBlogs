import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import unknownUserImage from "@/public/unknown-user.png";

export async function UserAvatar() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <Avatar>
      <AvatarImage
        src={session.user.image || "/unknown-user.png"}
        alt={`${session.user.name || "User"}'s avatar`}
      />
      <AvatarFallback>
        {session.user.name ? session.user.name[0].toUpperCase() : "U"}
      </AvatarFallback>
    </Avatar>
  );
}

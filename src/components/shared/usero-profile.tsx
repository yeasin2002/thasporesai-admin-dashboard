import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = {
    name: "Liam Anderson",
    username: "@liamand",
    avatarSrc: "https://github.com/yeasin2002.png", // The actual image for Liam
  };

  const handleEditProfile = () => {
    console.log("Navigating to Edit Profile...");
    navigate("edit-profile");
  };

  return (
    <div className="flex items-center gap-4">
      {/* notification  */}
      {/* <div className="flex items-center justify-center rounded-lg bg-blue-500/20 p-2 text-blue-600">
        <div className="relative h-6 w-6">
          <svg className="h-full w-full" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V9c0-3.15-2.28-5.83-5.21-6.49A3.996 3.996 0 0 0 12 2c-.17 0-.34.02-.51.05C8.28 3.17 6 5.85 6 9v7l-2 2v1h16v-1l-2-2z" />
          </svg>

          <span className="absolute top-0 right-0 h-2 w-2 animate-pulse rounded-full border-2 border-blue-500 bg-white"></span>
        </div>
      </div> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center gap-3 rounded-md p-1 transition-colors hover:bg-gray-100">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatarSrc} alt={user.name} />
              <AvatarFallback>LA</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEditProfile}>
            <span>Edit Profile</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;

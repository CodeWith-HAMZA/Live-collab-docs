import { liveblocks } from "@/lib/liveblocks";
import { getRandomColor, getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  // Get the current user from your database
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
    return new Response("Unauthorized", { status: 401 });
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: clerkUser?.id || "",
      groupIds:[], // Optional
    },
    {
      userInfo: {
        id: clerkUser?.id || "",
        name: clerkUser?.fullName || "",
        email: clerkUser?.emailAddresses[0]?.emailAddress || "",
        avatarUrl: clerkUser?.imageUrl || "",
        color: getUserColor(clerkUser?.id) || "#FF0000",
      },
    }
  );
  // make a function to generate a random # color

  return new Response(body, { status });
}

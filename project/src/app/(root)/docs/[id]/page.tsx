import CollaborativeRoom from "@/components/CollaborativeRoom";
import { Editor } from "@/components/Editor";
import Header from "@/components/shared/Header";
import { getDocument } from "@/lib/actions/liveblocks.actions";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function Document({ searchParams, params }: SearchParamProps) {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const room = await getDocument({
    roomId: params?.id || "",
    userId: clerkUser.emailAddresses[0].emailAddress || "",
  });
  if (!room) redirect("/?error=room-not-found");
  const roomId = room?.id;
  const metaData = room?.metadata;
  console.log("Document", metaData);
  // doc-room
  return (
    <CollaborativeRoom
      roomMetadata={metaData}
      roomId={params?.id || roomId || ""}
    />
  );
}

export default Document;

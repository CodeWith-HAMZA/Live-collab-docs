"use client";
import { Input } from "@/components/ui/input";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import React, { useEffect, useRef } from "react";
import Header from "./shared/Header";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Editor } from "./Editor";
import ActiveCollaborators from "./ActiveCollaboratorsList";
import Loader from "./shared/Loader";
import Image from "next/image";

function CollaborativeRoom({
  roomId,
  roomMetadata,
  currentUserType,
}: CollaborativeRoomProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState("");
  currentUserType = "editor";

  const updateTitleHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditing(false);
      // update the title
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // we didn't put the RoomProvider in the Live Blocks Provider, cuz we want  multiple rooms for each document

    <RoomProvider id={roomId}>
      {/* room-id will be dynamically genrated, whenever user generates a new doc */}
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-between gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter Title"
                  ref={inputRef}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <p className="document-title -ml-16">{content}</p>
              )}

              {currentUserType === "editor" && !editing ? (
                <div className="cursor-pointer hover:opacity-80">
                  <Image
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                    onClick={() => setEditing(true)}
                  />
                </div>
              ) : null}
              {currentUserType !== "editor" && !editing ? (
                <p className="view-only-tag ">View Only</p>
              ) : null}

              {loading && <p className="text-sm text-gray-400">Saving...</p>}
              {/* <p className="document-title -ml-16">Untitled</p> */}
            </div>
            <div className="flex justify-end gap-2 sm:gap-3 ">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default CollaborativeRoom;

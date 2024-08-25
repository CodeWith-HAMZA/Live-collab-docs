"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import Loader from "@/components/shared/Loader";
import { getClerkUsers } from "@/lib/actions/user.actions";

export function LiveBlocksProvider({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const clerkUsers = getClerkUsers({ userIds});
        return clerkUsers;
      }}
      //   publicApiKey={
      //     "pk_dev_GiZfUmJFM9Q1t9JbwFSeBgI4wr7QSEOCJJzE0O8Hj03wGM1Ou9cF1IvsDwGvjb3Y"
      //   }
    >
      {/* <RoomProvider id="my-room"> */}
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
      {/* </RoomProvider> */}
    </LiveblocksProvider>
  );
}

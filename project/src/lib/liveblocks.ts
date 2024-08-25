import { LIVEBLOCKS_SECRET } from "@/constants";
import { Liveblocks } from "@liveblocks/node";

export const liveblocks = new Liveblocks({
  secret: LIVEBLOCKS_SECRET,
});

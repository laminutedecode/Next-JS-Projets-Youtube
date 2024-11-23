
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const { userId } = getAuth(req);


  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(200).json({});
}
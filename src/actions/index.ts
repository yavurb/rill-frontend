import type Broadcast from "@/interfaces/broadcast";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const SERVER_URL = import.meta.env.BACKEND_URL;

const createBroadcast = defineAction({
  input: z.object({
    title: z.string({ required_error: "Broadcast's title is required" }).min(3),
    sdp: z.string(),
  }),
  handler: async (input) => {
    const data = {
      title: input.title,
      sdp: input.sdp,
    }
    console.log("data", data);
    const response = await fetch(`${SERVER_URL}/broadcasts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });


    if (response.ok) {
      const broadcast = (await response.json()) as { sdp: string };
      return broadcast.sdp;
    }

    return null;
  },
});

const getBroadcasts = defineAction({
  handler: async () => {
    const response = await fetch(`${SERVER_URL}/broadcasts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // TODO: Handle error
    if (response.ok) {
      const broadcast = (await response.json()) as { broadcasts: Broadcast[] };
      return broadcast.broadcasts;
    }

    return [];
  },
});

export const server = {
  createBroadcast,
  getBroadcasts,
}
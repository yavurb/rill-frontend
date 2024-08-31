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

const getBroadcast = defineAction({
  input: z.string(),
  handler: async (broadcastID) => {
    const response = await fetch(`${SERVER_URL}/broadcasts/${broadcastID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // TODO: Handle error
    if (response.ok) {
      const broadcast = (await response.json()) as Broadcast;
      return broadcast;
    }

    return null;
  },
});

const joinBroadcast = defineAction({
  input: z.object({
    broadcastID: z.string(),
    sdp: z.string(),
  }),
  handler: async (input) => {
    const data = {
      sdp: input.sdp,
    }
    const response = await fetch(`${SERVER_URL}/broadcasts/${input.broadcastID}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    // TODO: Handle error
    if (response.ok) {
      const broadcast = (await response.json()) as { sdp: string };
      return broadcast.sdp;
    }

    return null;
  },
});

export const server = {
  createBroadcast,
  getBroadcasts,
  getBroadcast,
  joinBroadcast,
}

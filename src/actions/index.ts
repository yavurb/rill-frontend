import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const SERVER_URL = import.meta.env.BACKEND_URL;

export const server = {
  createBroadcast: defineAction({
    input: z.object({
      title: z.string({ required_error: "Broadcast's title is required" }).min(3),
      sdp: z.string(),
    }),
    handler: async (input) => {
      const response = await fetch(`${SERVER_URL}/broadcasts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: input.title,
          sdp: input.sdp,
        }),
      });

      console.log("response", response);

      if (response.ok) {
        const broadcast = (await response.json()) as { sdp: string };

        return broadcast.sdp;
      }

      return null;
    },
  }),
}

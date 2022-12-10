import { config } from "./config.js";
export default {
  async fetch() {;
    return new Response(config.message);
  },
};

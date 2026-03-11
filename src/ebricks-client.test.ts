import { expect, test } from "vitest";
import { EbricksClient } from "./ebricks-client.js";
import { config } from "./config.js";

test.skipIf(!config.getBoolean("MANUAL_TEST"))(``, async () => {
  const client = new EbricksClient();

  const topics = await client.getTopics({ seq: 128, unit: 0 });

  expect(topics.length).toBeGreaterThan(0);
});

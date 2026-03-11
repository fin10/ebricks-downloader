import { expect, test } from "vitest";
import { EbricksClient } from "./ebricks-client.js";
import { config } from "./config.js";

const isManualTestEnabled = config.getBoolean("MANUAL_TEST_ENABLED");

test.skipIf(!isManualTestEnabled)(`Get topics`, async () => {
  const client = new EbricksClient();

  const topics = await client.getTopics({ seq: 128, unit: 0 });

  expect(topics.length).toBeGreaterThan(0);
});

test.skipIf(!isManualTestEnabled)(`Download topic`, async () => {
  const client = new EbricksClient();

  const [topic] = (await client.getTopics({ seq: 128, unit: 0 })) || [];

  expect(topic).toBeDefined();

  const stream = await client.download(topic);

  expect(stream).toBeDefined();
});

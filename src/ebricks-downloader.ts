import fs from "fs";
import { config } from "./config.js";
import { EbricksClient, EbricksTopic } from "./ebricks-client.js";

const DOWNLOAD_DIR = config.getRequiredString("DOWNLOAD_DIR");

export class EbricksDownloader {
  constructor(
    private readonly client = new EbricksClient(),
    private readonly outputDir = DOWNLOAD_DIR,
  ) {}

  async downloads(seq: number) {
    const topics: EbricksTopic[] = [];

    for (let i = 0; ; i++) {
      const topics = await this.client.getTopics({ seq, unit: i });
      if (!topics) {
        break;
      }
      topics.forEach((topic) => topics.push(topic));
    }

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    console.info(`Found ${topics.length} topics`);

    return Promise.all(
      topics.map(async (topic) => {
        const filePath = `${this.outputDir}/${topic.file_name}`;

        const writer = fs.createWriteStream(filePath);
        const stream = await this.client.download(topic);

        stream.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on("finish", () => {
            console.info(`Downloaded ${filePath}`);
            resolve(filePath);
          });
          writer.on("error", reject);
        });
      }),
    );
  }
}

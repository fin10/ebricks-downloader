import { program } from "commander";
import { EbricksDownloader } from "./ebricks-downloader.js";

program.argument("<number>", "Book ID");

program.parse();

const [seq] = program.args;

try {
  const downloader = new EbricksDownloader();

  await downloader.downloads(Number(seq));

  console.info(`Completed downloads with id=${seq}`);
} catch (err) {
  const error =
    err instanceof Error ? err : new Error("Unknown error", { cause: err });
  console.error(`Failed to downloads with seq=${seq}\n${error.stack}`);
  process.exit(1);
}

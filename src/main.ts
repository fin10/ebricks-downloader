import { program } from "commander";
import { EbricksDownloader } from "./ebricks-downloader.js";

program.argument("<number>");

program.parse();

const [seq] = program.args;

const downloader = new EbricksDownloader();

downloader
  .downloads(Number(seq))
  .catch((err) =>
    console.error(`Failed to downloads with seq=${seq}\n${err.stack}`),
  );

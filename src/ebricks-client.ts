import axios, { AxiosInstance } from "axios";
import moment from "moment";
import { config } from "./config.js";
import { Readable } from "stream";

const EBRICKS_URL = config.getRequiredString("EBRICKS_URL");

export type EbricksTopicsResponse = Readonly<{
  topics: readonly EbricksTopic[];
}>;

export type EbricksTopicsNoResponse = Readonly<{
  topics: boolean;
}>;

export type EbricksTopic = Readonly<{
  seq: string;
  topic_no: string;
  title: string;
  file_name: string;
  file_save_name: string;
  file_uri: string;
}>;

export class EbricksClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(url = EBRICKS_URL) {
    this.axiosInstance = axios.create({
      baseURL: url,
    });
  }

  async getTopics({
    seq,
    unit,
  }: Readonly<{ seq: number; unit: number }>): Promise<EbricksTopic[]> {
    const params = new URLSearchParams({
      seq: String(seq),
      unit_no: String(unit),
    });

    const started = moment();

    const res = await this.axiosInstance.post<
      EbricksTopicsResponse | EbricksTopicsNoResponse
    >("/qr/JsonTopicFileList", params);

    const topics = Array.isArray(res.data.topics) ? res.data.topics : [];

    console.info(`Got ${topics.length} topics in ${moment().diff(started)} ms`);

    return topics;
  }

  async download(topic: EbricksTopic) {
    const res = await this.axiosInstance.get<Readable>(
      `${topic.file_uri}/${topic.file_save_name}`,
      {
        responseType: "stream",
      },
    );

    return res.data;
  }
}

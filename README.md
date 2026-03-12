# Ebricks Downloader

A simple CLI tool to download ebricks audio materials for children's English education (e.g., phonics).  
`seq` means the ebricks book ID and is used to fetch and save that book’s MP3 files locally in a predictable structure.  
Useful for personal study or educational offline archives.

What this tool does:

- Fetches the topic list for a given `seq` from the ebricks service.
- Downloads each MP3 file to your local `DOWNLOAD_DIR`.
- Logs progress to the console.

## Requirements

- Node.js (ESM)
- npm

## Setup

Install dependencies:

```bash
npm install
```

Create `.env` (or edit the existing one) and set the required values:

```bash
EBRICKS_URL=https://mp3.ebricks.co.kr
DOWNLOAD_DIR=./out
```

## Configuration

Environment variables:

- `EBRICKS_URL` Base URL for the ebricks MP3 service (required, e.g., `https://mp3.ebricks.co.kr`).
- `DOWNLOAD_DIR` Local output directory for downloaded MP3 files.

## Finding `seq` (Book ID)

You can get the `seq` from the QR code URL provided with the book:

- Scan the QR code on the book material.
- Open the URL and locate the numeric book ID in the query string (e.g., `https://mp3.ebricks.co.kr/qr?id=128`).
- Use that number as the `seq` value when running the downloader (`seq=128` in this example).

## Usage

Run the downloader with a `seq` value (book ID):

```bash
npm run download -- 128
```

Output:

- Files are saved to `DOWNLOAD_DIR`.
- Filenames follow the `file_name` provided by the API.
- Existing files with the same name will be overwritten.

Example output structure:

```
out/
  Track_01.mp3
  Track_02.mp3
  ...
```

## Project Structure

- `src/main.ts` CLI entry.
- `src/ebricks-downloader.ts` Orchestrates topic fetching and file downloads.
- `src/ebricks-client.ts` HTTP client for topic list and file streaming.

## Notes

- This project is intended for personal or educational use.

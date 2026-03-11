function getRequiredString(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getBoolean(key: string): boolean {
  const value = process.env[key];
  if (!value) {
    return false;
  }
  return value === "true";
}

export const config = {
  getRequiredString,
  getBoolean,
};

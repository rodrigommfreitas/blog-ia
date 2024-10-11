import { promises as fs } from "fs";
import path from "path";

export async function fileExists(src: string): Promise<boolean> {
  const filePath = path.join(process.cwd(), "public", src);
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

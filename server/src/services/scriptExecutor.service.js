import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const executeBrowserbaseScript = async ({ script, page }) => {
  const filename = `${randomUUID()}.mjs`;

  const tempPath = path.join(process.cwd(), "temp", filename);

  try {
    await fs.mkdir(path.dirname(tempPath), {
      recursive: true,
    });
    // console.log("Wrapped Script:\n", script);
    await fs.writeFile(tempPath, script);

    const module = await import(`file://${tempPath}?t=${Date.now()}`);

    await module.default({
      page,
    });
  } finally {
    await fs.unlink(tempPath).catch(() => {});
  }
};

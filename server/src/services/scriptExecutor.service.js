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
    await fs.writeFile(tempPath, script);

    const module = await import(`file://${tempPath}?t=${Date.now()}`);
    if (typeof module.default !== "function") {
      throw new Error("Automation script did not export a default function.");
    }

    await module.default({ page });
  } catch (error) {
    const message = error?.message || "Unknown automation execution error";
    throw new Error(`Automation execution failed: ${message}`);
  } finally {
    await fs.unlink(tempPath).catch(() => {});
  }
};

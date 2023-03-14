import { exec } from "node:child_process";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export async function getChangedFiles() {
  const { stdout } = await execAsync("git status --porcelain");
}

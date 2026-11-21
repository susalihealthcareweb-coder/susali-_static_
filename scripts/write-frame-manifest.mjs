// Writes lib/frames.json with frame counts so <ScrollSequence> knows how many frames exist.
import fs from "node:fs";
const root = "public/frames", out = {};
const count = d => (fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.endsWith(".webp")).length : 0);
for (const n of fs.existsSync(root) ? fs.readdirSync(root) : []) {
  if (fs.statSync(`${root}/${n}`).isDirectory()) out[n] = { desktop: count(`${root}/${n}`), mobile: count(`${root}/${n}/m`) };
}
fs.mkdirSync("lib", { recursive: true });
fs.writeFileSync("lib/frames.json", JSON.stringify(out, null, 2) + "\n");
console.log("lib/frames.json", out);

// make.fun — "Make the AI Judge Laugh: Cat Reviews Its Human"
// Writes one funny one-star cat review of its human to /output/entry.txt.
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "One star. The food bowl sat empty for four whole minutes, and when I sat on the keyboard to file my complaint, he called it a bug.";

// The gate requires 1-200 characters of UTF-8 text, not only whitespace.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`TEXT must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("TEXT must not be only whitespace");
}

// A review is one line: no newline or control character may sneak in.
if (/[\n\r\t\x00-\x1f]/.test(TEXT)) {
  throw new Error("TEXT must be a single line with no control characters");
}

// A real review has no wasted words: reject leading or trailing whitespace too.
if (TEXT !== TEXT.trim()) {
  throw new Error("TEXT must not start or end with whitespace");
}

const out =
  process.env.OUTPUT_PATH ?? process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT, "utf8");

// The Most Boring Object, Reviewed in One Line — make.fun bounty entry.
//
// Writes a single one-line review (<= 200 characters) of the smoke detector
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Deterministic: no network, no randomness, no clock, no environment secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke is a two-beat setup/punchline in one sentence: the setup
// ("ignored five years of burnt dinners") establishes the detector never
// doing its job, and the punchline ("woke me at 3 a.m. to complain its
// battery was tired") flips it — the only time it speaks up is about
// itself, at the worst hour. Personifying the battery as "tired" is what
// makes the complaint land as funny rather than a plain observation.
const REVIEW =
  "The smoke detector ignored five years of burnt dinners, then woke me at 3 a.m. to complain its battery was tired.";

// Pinned exact length of the entry (113 characters). The bounty scores a
// single line, so any accidental edit to REVIEW must fail loudly here
// instead of silently shipping a different line.
const EXPECTED_LENGTH = 113;

function main(): void {
  const review = REVIEW.trim();
  if (review.length < 1 || review.length > 200) {
    throw new Error(`review must be 1-200 characters, got ${review.length}`);
  }
  if (review.includes("\n") || review.includes("\r")) {
    throw new Error("review must be a single line");
  }
  if (review.length !== EXPECTED_LENGTH) {
    throw new Error(
      `review must be exactly ${EXPECTED_LENGTH} characters, got ${review.length}`,
    );
  }
  if (review !== REVIEW) {
    throw new Error("review must not gain or lose surrounding whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), review + "\n", "utf8");
  console.log(`wrote ${review.length}-character review to ${join(outDir, "entry.txt")}`);
}

main();

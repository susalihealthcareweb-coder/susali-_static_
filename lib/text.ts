/** Splits a one-line heading into two parts at its last ", " or " — " so line 2 can take the gradient. Text is unchanged. */
export function splitTwo(text: string): [string, string] {
  for (const sep of [" — ", ", "]) {
    const i = text.lastIndexOf(sep);
    if (i > 0) return [text.slice(0, i + sep.trimEnd().length), text.slice(i + sep.length)];
  }
  return [text, ""];
}

/** Splits "A. B. C." into ["A.", "B.", "C."] */
export const sentences = (t: string) => t.split(/(?<=\.)\s+/).filter(Boolean);

/** Cached so the footer stays part of the static shell. */
export async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

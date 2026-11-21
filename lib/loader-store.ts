// Tiny pub/sub so the hero <ScrollSequence> can drive the page loader.
type State = { loaded: number; target: number; done: boolean };
let state: State = { loaded: 0, target: 30, done: false };
const subs = new Set<(s: State) => void>();

export const loaderStore = {
  get: () => state,
  set(p: Partial<State>) {
    state = { ...state, ...p };
    subs.forEach((f) => f(state));
  },
  subscribe(f: (s: State) => void) {
    subs.add(f);
    return () => void subs.delete(f);
  },
};

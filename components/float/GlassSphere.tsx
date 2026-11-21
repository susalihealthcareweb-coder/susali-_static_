import Floater, { type FloatOpts } from "./Floater";

export type SphereKind = "teal" | "lav" | "pink" | "glass";

/** Pure-CSS glossy sphere or glass bubble (see .sphere-* in globals.css). */
export default function GlassSphere({ kind = "lav", size = 60, depth = 1, ...opts }: { kind?: SphereKind; size?: number } & Omit<FloatOpts, "children">) {
  return (
    <Floater depth={depth} rot={0} {...opts}>
      <span className={`sphere sphere-${kind} block`} style={{ width: size, height: size }} />
    </Floater>
  );
}

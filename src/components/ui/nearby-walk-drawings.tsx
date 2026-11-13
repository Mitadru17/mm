/** Nearby Walk drawing adaptation. Original component: Aakash Mehra.
 * Kausani scenes are schematic illustrations, not architectural surveys. */
export function HotelDrawing() {
  return (
    <>
      <path className="nw-roof" d="M27 150 101 116 178 150Z" />
      <rect className="nw-wall" x="37" y="150" width="132" height="112" />
      <path
        className="nw-line"
        d="M32 188H175M32 226H175M32 184V199M175 184V199M32 222V237M175 222V237"
      />
      {[53, 95, 137].flatMap((x, i) =>
        [160, 199].map((y, j) => (
          <rect
            key={`${x}-${y}`}
            className={(i + j) % 2 ? "nw-lit nw-tw" : "nw-win"}
            x={x}
            y={y}
            width="20"
            height="17"
            rx="1"
            style={{ animationDelay: `${i + j}s` }}
          />
        )),
      )}
      <path
        className="nw-thin"
        d="M42 194H166M42 232H166M48 188V194M68 188V194M88 188V194M108 188V194M128 188V194M148 188V194M48 226V232M68 226V232M88 226V232M128 226V232M148 226V232"
      />
      <rect className="nw-door" x="90" y="236" width="26" height="26" rx="1" />
      <rect className="nw-win" x="51" y="239" width="20" height="13" />
      <rect className="nw-lit" x="135" y="239" width="20" height="13" />
      <path className="nw-line" d="M87 262V267H119V262" />
    </>
  );
}

function TeaDrawing() {
  return (
    <>
      <path
        className="nw-hill"
        d="M255 262C286 218 305 207 350 210S423 228 470 262Z"
      />
      <path
        className="nw-thin"
        d="M273 251Q363 224 454 251M291 239Q359 214 434 239M316 223Q359 208 408 224"
      />
      {[282, 318, 354, 390, 426].map((x, i) => (
        <g key={x} transform={`translate(${x} ${245 - (i % 2) * 7})`}>
          <path
            className="nw-leaf"
            d="M0 0Q-13-17-17-6Q-13 2 0 0Q14-17 18-6Q13 3 0 0Z"
          />
          <path className="nw-thin" d="M0 0V8" />
        </g>
      ))}
      <rect className="nw-wall" x="337" y="171" width="52" height="40" />
      <path className="nw-roof" d="M328 171 362 149 399 171Z" />
      <rect className="nw-lit" x="348" y="183" width="12" height="13" />
      <rect className="nw-door" x="370" y="185" width="10" height="26" />
    </>
  );
}

function MuseumDrawing() {
  return (
    <>
      <path className="nw-stone" d="M585 251H753V262H585Z" />
      <rect className="nw-wall" x="598" y="184" width="141" height="67" />
      <path className="nw-roof" d="M587 185 667 145 751 185Z" />
      <path className="nw-thin" d="m604 179 63-30 65 30M612 217H726" />
      <rect className="nw-door" x="656" y="217" width="25" height="34" />
      {[613, 705].map((x) => (
        <g key={x}>
          <rect className="nw-win" x={x} y="200" width="16" height="23" />
          <path
            className="nw-thin"
            d={`M${x} 210H${x + 16}M${x + 8} 200V223`}
          />
        </g>
      ))}
      <path
        className="nw-thin"
        d="M647 204Q658 198 669 204Q680 198 690 204V217Q680 212 669 217Q658 212 647 217ZM669 204V217"
      />
      <path className="nw-line" d="M640 251V256H695V251" />
    </>
  );
}

function AshramDrawing() {
  return (
    <>
      <path
        className="nw-hill"
        d="M830 262C882 248 922 192 981 184S1093 176 1200 230V262Z"
      />
      <path
        className="nw-thin"
        d="M920 234Q967 196 1048 203M952 249Q1044 201 1165 238"
      />
      <rect className="nw-stone" x="963" y="187" width="153" height="10" />
      <rect className="nw-wall" x="973" y="137" width="133" height="50" />
      <path className="nw-roof" d="M963 138 1036 102 1117 138Z" />
      <path className="nw-thin" d="m978 132 58-25 64 25" />
      <rect className="nw-door" x="1028" y="160" width="22" height="27" />
      {[986, 1008, 1061, 1083].map((x, i) => (
        <rect
          key={x}
          className={i % 2 ? "nw-lit nw-tw" : "nw-win"}
          x={x}
          y="151"
          width="13"
          height="18"
        />
      ))}
      <path className="nw-line" d="M1017 187V194H1062V187" />
      <Pine x={928} y={218} size={1.1} />
      <Pine x={1132} y={219} size={1.35} />
    </>
  );
}

export function Pine({
  x,
  y,
  size = 1,
}: {
  x: number;
  y: number;
  size?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path className="nw-leaf" d="M0-56-15-31H-9L-23-10H23L9-31H15Z" />
      <path className="nw-line" d="M0-10V5" />
    </g>
  );
}

export const DRAWINGS = {
  tea: TeaDrawing,
  museum: MuseumDrawing,
  ashram: AshramDrawing,
};
export const DRAWING_LAYOUT: Record<
  string,
  { i: number; hit: [number, number, number, number]; label: [number, number] }
> = {
  tea: { i: 1, hit: [252, 91, 221, 172], label: [362, 98] },
  museum: { i: 2, hit: [570, 84, 195, 179], label: [670, 93] },
  ashram: { i: 3, hit: [913, 19, 224, 224], label: [1040, 52] },
};

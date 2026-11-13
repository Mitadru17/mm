export default function Brand({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 142"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M65 5 99 21v55c0 26-16 42-34 52-18-10-34-26-34-52V21Z"
        stroke="currentColor"
        strokeWidth=".7"
      />
      <path
        d="M65 10 94 24v51c0 23-13 38-29 47-16-9-29-24-29-47V24Z"
        stroke="currentColor"
        strokeWidth=".4"
      />
      <circle cx="65" cy="37" r="8" stroke="currentColor" strokeWidth=".8" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI) / 8;
        return (
          <path
            key={i}
            d={`M${65 + 11 * Math.cos(a)} ${37 + 11 * Math.sin(a)}L${65 + 16 * Math.cos(a)} ${37 + 16 * Math.sin(a)}`}
            stroke="currentColor"
            strokeWidth=".55"
          />
        );
      })}
      <path
        d="m43 69 14-21 12 17 9-12 11 16M49 69l13-17"
        stroke="currentColor"
        strokeWidth=".85"
      />
      <text
        x="65"
        y="84"
        textAnchor="middle"
        fontFamily="Cormorant Garamond,Georgia,serif"
        fontSize="12"
        letterSpacing="1.5"
        fill="currentColor"
      >
        MYSTIC
      </text>
      <text
        x="65"
        y="94"
        textAnchor="middle"
        fontFamily="DM Sans,Arial,sans-serif"
        fontSize="4.8"
        letterSpacing="1.6"
        fill="currentColor"
      >
        MOUNTAIN
      </text>
      <path d="M48 101h34" stroke="currentColor" strokeWidth=".4" />
      <text
        x="65"
        y="111"
        textAnchor="middle"
        fontFamily="DM Sans,Arial,sans-serif"
        fontSize="4.5"
        letterSpacing="1.5"
        fill="currentColor"
      >
        KAUSANI
      </text>
      {[0, 1].map((side) => (
        <g
          key={side}
          transform={side ? "translate(130 0) scale(-1 1)" : ""}
          stroke="currentColor"
          strokeWidth=".7"
        >
          <path d="M57 132c-27-8-39-29-37-60" />
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M${22 + i * i * 0.4} ${80 + i * 6}q-13 -2 -12 -12q12 1 12 12q10 -12 9 -18q-12 4 -9 18`}
            />
          ))}
        </g>
      ))}
      <path d="m65 131 3 4-3 4-3-4z" fill="currentColor" />
    </svg>
  );
}

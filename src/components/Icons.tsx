export function SocialIcon({ id }: { id: string }) {
  if (id === "phone")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
      </svg>
    );
  if (id === "whatsapp")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
      </svg>
    );
  if (id === "youtube")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12c0 1.6.2 3.2.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.3-1.6.5-3.2.5-4.8s-.2-3.2-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z" />
      </svg>
    );
  if (id === "instagram")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a8.1 8.1 0 0 0 4.7 1.5V6.7a4.8 4.8 0 0 1-4.7-4.7Z" />
    </svg>
  );
}

export function ChatTicks() {
  return (
    <svg viewBox="0 0 18 12" aria-hidden="true" className="ticks">
      <path d="M1 6.5l3 3L10 2.5M7 9.5l1 1 6.5-8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MethodIcon({ id }: { id: string }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {id === "target" && (
        <g {...p}>
          <circle cx="24" cy="24" r="17" />
          <circle cx="24" cy="24" r="10" />
          <circle cx="24" cy="24" r="3" />
          <path d="M24 3v8M24 37v8M3 24h8M37 24h8" />
        </g>
      )}
      {id === "plan" && (
        <g {...p}>
          <rect x="7" y="9" width="34" height="32" rx="4" />
          <path d="M7 18h34M16 5v8M32 5v8M14 26h6M14 33h6M26 26h8M26 33h8" />
        </g>
      )}
      {id === "board" && (
        <g {...p}>
          <rect x="5" y="7" width="38" height="26" rx="3" />
          <path d="M18 41l6-8 6 8M12 26l7-9 6 6 9-11" />
        </g>
      )}
      {id === "play" && (
        <g {...p}>
          <rect x="5" y="9" width="38" height="30" rx="6" />
          <path d="M20 17v14l12-7z" />
        </g>
      )}
      {id === "chart" && (
        <g {...p}>
          <path d="M6 41h36M10 41V27M19 41V18M28 41V23M37 41V9" />
          <path d="M8 20l11-9 9 6 11-11" />
        </g>
      )}
    </svg>
  );
}

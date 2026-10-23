// SVG symbols used by the example cards (<svg><use href="#i-lock" /></svg>), as in the mock-up.
export default function Sprite() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
      <symbol id="i-lock" viewBox="0 0 24 24"><rect fill="none" height="10" rx="2" stroke="currentColor" strokeWidth="2" width="16" x="4" y="11" /><path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="currentColor" strokeWidth="2" /></symbol>
    </svg>
  );
}

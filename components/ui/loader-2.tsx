"use client";

/**
 * Loader-2 — three SVG shapes (circle, triangle, square) that trace their
 * outlines with a traveling dot. Pure CSS animations, no JS state needed.
 *
 * Styling lives in app/globals.css under the `.loader` selector.
 */
export const Component = () => {
  return (
    <>
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle r="32" cy="40" cx="40" id="test"></circle>
        </svg>
      </div>

      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>

      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" y="8" x="8"></rect>
        </svg>
      </div>
    </>
  );
};

export default Component;

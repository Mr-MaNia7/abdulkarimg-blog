/**
 * A hairline that fills as the page scrolls. Pure CSS (scroll-driven
 * animation); browsers without support simply do not show it.
 */
export default function ReadingProgress() {
  return <div className="reading-progress" aria-hidden="true" />
}

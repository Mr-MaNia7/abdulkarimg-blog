/**
 * First-view reveal for index lists, as an inline script so it runs before
 * React hydrates (lists never wait on the bundle).
 *
 * - Marks <html> with `js`; CSS hides [data-reveal] children only under `.js`
 *   and only when the reader has not asked for reduced motion.
 * - Each list animates once, the first time it enters the viewport. The
 *   script only toggles a class on the list (marked suppressHydrationWarning);
 *   the capped stagger is pure CSS (:nth-child).
 * - `reveal-ready` tells CSS the observer is running; without it a CSS
 *   failsafe shows everything, so a script failure can never hide content.
 * - window.hashiyaReveal() is re-run after client-side navigation.
 */
export const revealScript = `(function(){var d=document.documentElement;d.classList.add('js');
function run(){if(!('IntersectionObserver' in window)){d.classList.remove('js');return}
var io=window.__hashiyaIO||(window.__hashiyaIO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-revealed');window.__hashiyaIO.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.05}));
document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(function(list){io.observe(list)});
d.classList.add('reveal-ready')}
window.hashiyaReveal=run;if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',run)}else{run()}})();`

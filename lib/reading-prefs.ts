export const PREFS_KEY = 'sima-reading'

/**
 * Runs in <head> before first paint (app/root-shell.tsx) so saved reading
 * preferences never flash. It also marks <html class="js">, which shows the
 * controls that need JavaScript (.js-only). Storage can throw (private mode),
 * hence try/catch.
 */
export const applyPrefsScript = `document.documentElement.classList.add('js');try{var p=JSON.parse(localStorage.getItem('${PREFS_KEY}')||'{}');var d=document.documentElement;if(p.v===1){if(p.size&&p.size!=='md')d.dataset.readingSize=p.size;if(p.font==='sans')d.dataset.readingFont='sans'}}catch(e){}`

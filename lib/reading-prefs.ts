export const PREFS_KEY = 'hashiya-reading'

/**
 * Runs in <head> before first paint (app/layout.tsx) so saved reading
 * preferences never flash. Storage can throw (private mode), hence try/catch.
 */
export const applyPrefsScript = `try{var p=JSON.parse(localStorage.getItem('${PREFS_KEY}')||'{}');var d=document.documentElement;if(p.v===1){if(p.size&&p.size!=='md')d.dataset.readingSize=p.size;if(p.font==='sans')d.dataset.readingFont='sans'}}catch(e){}`

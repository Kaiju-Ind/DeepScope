import { describe, expect, it } from 'vitest';
import { analyzeSite } from '@/lib/detection/engine';
import type { PageSignals } from '@/lib/detection/types';
import { technologies } from '@/registry/technologies';

/**
 * Unanchored file-name patterns inherited from Wappalyzer matched other products:
 * `react(?:-dom)?(?:\.min)?\.js` matched `preact.min.js`, `moment.js` matched
 * `inmoment.js`, `three.js` matched `twentytwentythree.js`.
 */
function idsForScripts(scripts: string[]): Set<string> {
	const page: PageSignals = {
		url: 'https://example.com/', hostname: 'example.com', html: '', text: '', scripts, stylesheets: [], links: [],
		resources: [], requests: [], scriptContents: [], stylesheetContents: [], cookies: {}, headers: {}, meta: {},
		dom: { selectors: {} }, storage: { localStorage: {}, sessionStorage: {} }, jsGlobals: {}, robotsTxt: '',
		dnsRecords: {}, certIssuer: '', probeResults: [], collectedAt: 1,
	};
	return new Set(analyzeSite(page, technologies).results.map((result) => result.technologyId));
}

describe('script file-name collisions', () => {
	it.each([
		['https://cdn.example.com/npm/preact/dist/preact.min.js', 'react'],
		['https://cdn.example.com/js/primereact.min.js', 'react'],
		['https://cdn.example.com/js/inmoment.js', 'moment-js'],
		['https://example.com/wp-content/themes/twentytwentythree/assets/twentytwentythree.js', 'three-js'],
		['https://cdn.example.com/js/consent-manager.min.js', 'onsen-ui'],
		['https://cdn.example.com/js/perimeterx.min.js', 'rxjs'],
		['https://cdn.example.com/js/mtcaptcha.min.js', 'mautic'],
	])('does not read %s as %s', (script, technologyId) => {
		expect(idsForScripts([script]).has(technologyId)).toBe(false);
	});

	it.each([
		['https://unpkg.com/react@18.3.1/umd/react.production.min.js', 'react'],
		['https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', 'react'],
		['https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js', 'moment-js'],
		['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', 'three-js'],
		['https://example.com/media/js/mtc.js', 'mautic'],
	])('still reads %s as %s', (script, technologyId) => {
		expect(idsForScripts([script]).has(technologyId)).toBe(true);
	});
});

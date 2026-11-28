import { STRESS_FIXTURES, STRESS_MARKERS } from '../fixtures.mjs';

/** Marker permitted only after the harness rewrites a document's contents. */
export const INJECTED_MARKER = { generator: 'mkdocs-1.5.3', name: 'MkDocs' };
const ALL_MARKERS = [...STRESS_MARKERS, INJECTED_MARKER.name];
// Real sites can show anything, except the fixture-only generators.
const REAL_FORBIDDEN = ALL_MARKERS.filter((name) => name !== 'WordPress' && name !== 'jQuery');
const REAL_SITES = ['https://example.com/', 'https://wordpress.org/', 'https://react.dev/', 'https://en.wikipedia.org/wiki/Firefox'];

/**
 * Own URL selection and document expectations for one run. Fixture navigation
 * and pushState share a counter so the recorded seed retains its URL sequence.
 */
export function create(origin, plan, random) {
	const { rnd, int, chance, pick } = random;
	let urlCounter = 0;

	/** Choose a weighted local fixture URL and vary its content seed or replacement target for this replay. */
	function fixtureUrl() {
		const paths = ['/wp.html', '/hugo.html', '/ghost.html', '/drupal.html', '/joomla.html', '/swap.html', '/spa-rewrite.html', '/huge.html', '/replace.html', '/busy.html'];
		const weights = [3, 3, 3, 3, 3, 2, 2, 1, 2, 0.5];
		let r = rnd() * weights.reduce((a, b) => a + b, 0);
		let path = paths.at(-1);
		for (let i = 0; i < paths.length; i++) {
			r -= weights[i];
			if (r <= 0) { path = paths[i]; break; }
		}
		const s = `s=${urlCounter++}`;
		if (path === '/huge.html') return `${origin}${path}?n=${20_000 + int(60_000)}&${s}`;
		if (path === '/replace.html') {
			const to = `${pick(['/hugo.html', '/ghost.html', '/drupal.html', '/joomla.html', '/wp.html'])}?${s}r`;
			return `${origin}${path}?to=${encodeURIComponent(to)}&after=${int(1200)}&${s}`;
		}
		return `${origin}${path}?${s}`;
	}

	/** Use local fixtures by default and visit sampled real sites only when the stress plan explicitly enables them. */
	function randomUrl() {
		if (plan.real && chance(plan.quick ? 0.08 : 0.15)) {
			const site = pick(REAL_SITES);
			return `${site}${site.includes('?') ? '&' : '?'}ds=${urlCounter++}`;
		}
		return fixtureUrl();
	}

	/** A page this run opened: the current fixture server or a real site, not a leftover from an earlier session. */
	function isOurs(url) {
		try {
			const parsed = new URL(url);
			if (parsed.origin === origin) return true;
			return /^https:$/.test(parsed.protocol) && REAL_SITES.some((site) => new URL(site).origin === parsed.origin);
		} catch {
			return false;
		}
	}

	/** What a document at `url` may and must show. */
	function expectation(url, extras = []) {
		let parsed;
		try { parsed = new URL(url); } catch { return undefined; }
		if (!/^https?:$/.test(parsed.protocol)) return undefined;
		if (/^(127\.0\.0\.1|localhost)$/.test(parsed.hostname) && parsed.origin !== origin) return undefined;
		if (parsed.origin !== origin) return { real: true, must: [], late: [], forbidden: REAL_FORBIDDEN.filter((n) => !extras.includes(n)) };
		const fixture = STRESS_FIXTURES[parsed.pathname];
		if (!fixture) return { must: [], late: [], forbidden: [] };
		const allowed = new Set([...fixture.must, ...(fixture.late ?? []), ...extras]);
		// A rewritten document may have lost its markers before any scan saw them.
		const rewritten = extras.includes(INJECTED_MARKER.name);
		return { must: rewritten ? [] : fixture.must, late: fixture.late ?? [], forbidden: ALL_MARKERS.filter((n) => !allowed.has(n)) };
	}

	/** Allocate a same-document URL from the navigation counter. */
	function historyPath() {
		return `?push=${urlCounter++}`;
	}

	return { fixtureUrl, randomUrl, isOurs, expectation, historyPath };
}

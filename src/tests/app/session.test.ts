import { describe, expect, it } from 'vitest';

import * as session from '@/app/session';

describe('side-panel session state', () => {
	it('starts an unseen tab at Summary and restores a seen tab route and scroll', () => {
		const tabId = 91_001;
		expect(session.open(tabId)).toEqual({ first: true, route: '/', scrollY: 0 });
		session.route(tabId, '/diagnostics?view=timeline');
		session.scroll(tabId, 640);
		expect(session.open(tabId)).toEqual({ first: false, route: '/diagnostics?view=timeline', scrollY: 640 });
	});

	it('keeps transient page state isolated by browser tab', () => {
		const firstTabId = 91_002;
		const secondTabId = 91_003;
		session.open(firstTabId);
		session.open(secondTabId);
		session.save(firstTabId, 'history', { query: 'vite' });
		session.save(secondTabId, 'history', { query: 'react' });

		expect(session.get(firstTabId, 'history')).toEqual({ query: 'vite' });
		expect(session.get(secondTabId, 'history')).toEqual({ query: 'react' });
	});
});

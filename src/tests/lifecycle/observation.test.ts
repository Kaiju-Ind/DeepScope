import { describe, expect, it } from 'vitest';

import type { ObservationSessionState } from '@/lib/content/observed-page-signals';
import {
	EXTENSION_OBSERVATION_POLICY,
	canRefreshObservationSession,
	getObservationRefreshBlockReason,
	isObservationSessionForUrl,
	shouldStartObservation,
} from '@/lib/lifecycle/observation';

function makeSession(overrides: Partial<ObservationSessionState> = {}): ObservationSessionState {
	return {
		status: 'idle',
		throttleMs: EXTENSION_OBSERVATION_POLICY.throttleMs,
		pendingMutationCount: 0,
		...overrides,
	};
}

describe('observation lifecycle helpers', () => {
	it('keeps current observe modes mapped to the same start decision', () => {
		expect(shouldStartObservation('none')).toBe(false);
		expect(shouldStartObservation('while-popup-open')).toBe(true);
		expect(shouldStartObservation('bounded')).toBe(true);
	});

	it('allows refresh only for observing and dirty sessions', () => {
		expect(canRefreshObservationSession(makeSession({ status: 'observing' }))).toBe(true);
		expect(canRefreshObservationSession(makeSession({ status: 'dirty' }))).toBe(true);
		expect(canRefreshObservationSession(makeSession({ status: 'idle' }))).toBe(false);
		expect(canRefreshObservationSession(makeSession({ status: 'stopped' }))).toBe(false);
	});

	it('treats hash-only URL changes as the same observed document', () => {
		const session = makeSession({
			expectedUrl: 'https://example.com/products#overview',
			status: 'dirty',
		});

		expect(isObservationSessionForUrl(session, 'https://example.com/products#pricing')).toBe(true);
	});

	it('blocks refresh when a session belongs to a previous page path', () => {
		const session = makeSession({
			expectedUrl: 'https://example.com/products',
			status: 'dirty',
		});

		expect(getObservationRefreshBlockReason(session, 'https://example.com/pricing')).toBe(
			'navigation',
		);
	});
});

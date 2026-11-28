import { describe, expect, it, vi } from 'vitest';

import { badgeText, createBadgeWriter, type BadgeState } from "../../lib/background/badge.ts";

/** A badge apply function whose calls finish only when the test releases them. */
function controlledApply() {
	const calls: { tabId: number; state: BadgeState; finish: () => void }[] = [];
	const apply = vi.fn((tabId: number, state: BadgeState) => new Promise<void>((resolve) => {
		calls.push({ tabId, state, finish: resolve });
	}));
	return { apply, calls };
}

describe('toolbar badge writer', () => {
	it('never lets an older count land after a newer clear', async () => {
		const { apply, calls } = controlledApply();
		const badges = createBadgeWriter(apply);

		void badges.set(7, { count: 12 });
		const cleared = badges.clear(7);
		expect(calls.map((call) => call.state.count)).toEqual([12]);

		calls[0]!.finish();
		await vi.waitFor(() => expect(calls).toHaveLength(2));
		expect(calls[1]!.state.count).toBe(0);
		calls[1]!.finish();
		await cleared;
	});

	it('applies only the newest state that waited behind a running write', async () => {
		const { apply, calls } = controlledApply();
		const badges = createBadgeWriter(apply);

		void badges.set(7, { count: 1 });
		void badges.set(7, { count: 2 });
		void badges.set(7, { count: 3 });
		calls[0]!.finish();
		await vi.waitFor(() => expect(calls).toHaveLength(2));
		calls[1]!.finish();

		expect(calls.map((call) => call.state.count)).toEqual([1, 3]);
	});

	it('keeps tabs independent and keeps writing after a failure', async () => {
		const onError = vi.fn();
		const apply = vi.fn(async (tabId: number) => {
			if (tabId === 1) throw new Error('tab gone');
		});
		const badges = createBadgeWriter(apply, onError);

		await Promise.all([badges.set(1, { count: 4 }), badges.set(2, { count: 5 })]);
		await badges.set(1, { count: 6 });

		expect(onError).toHaveBeenCalledTimes(2);
		expect(apply).toHaveBeenCalledWith(2, { count: 5 });
		expect(apply).toHaveBeenCalledWith(1, { count: 6 });
	});

	it('drops a waiting write for a tab that closed', async () => {
		const { apply, calls } = controlledApply();
		const badges = createBadgeWriter(apply);

		void badges.set(7, { count: 1 });
		void badges.set(7, { count: 2 });
		badges.forget(7);
		calls[0]!.finish();
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(calls).toHaveLength(1);
	});

	it('shows nothing for zero and caps large counts', () => {
		expect(badgeText(0)).toBe('');
		expect(badgeText(7)).toBe('7');
		expect(badgeText(150)).toBe('99+');
	});
});

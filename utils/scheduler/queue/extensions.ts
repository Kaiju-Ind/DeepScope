/**
 * Optional queue contract extensions: labels and bulk control by label or owner.
 *
 * A browser extension keys work by tab, window and browser session, and has to
 * act on all of one tab's work when the tab closes, or on all of a window's
 * work when its active tab changes. The core {@link Queue} contract addresses
 * one item at a time, so these extensions add:
 *
 * - `labels` on `add()`: small string or number facts stored with the item;
 * - `cancelWhere()`: cancel every unfinished item whose labels match;
 * - `reprioritize()`: change the priority of every unfinished matching item;
 * - `abandon()`: return every live claim of one owner (or of every other owner)
 *   to the queue at once, for an owner known to be gone.
 *
 * Every method is optional, so a store can implement the core contract alone.
 * Callers feature-test each method. The conformance suite in `./testing.ts`
 * runs the extension cases only for the methods a store provides.
 *
 * DeepScope's own file, proposed for upstream; not vendored.
 *
 * @module
 */
import type { Context, Queue, QueueAddOptions, QueueRef } from './types.ts';

/** One label value. Strings and numbers never compare equal to each other. */
export type LabelValue = string | number;

/** Labels stored with one item. Names and string values are 1 to 256 characters. */
export type Labels = Readonly<Record<string, LabelValue>>;

/** `add()` options with labels. */
export interface LabeledAddOptions extends QueueAddOptions {
	/** Facts used by `cancelWhere()` and `reprioritize()`; at most 16 entries. */
	readonly labels?: Labels;
}

/** Select the claims `abandon()` releases: one owner's, or every owner's except one. */
export type OwnerSelector = { readonly owner: string } | { readonly exceptOwner: string };

/** A new priority, or a function of the current priority and the item's labels. */
export type PriorityUpdate = number | ((current: number, labels: Labels) => number);

/** Optional bulk methods. Each returns how many items it changed. */
export interface QueueExtensions {
	/**
	 * Cancel every queued or claimed item whose labels include every entry of
	 * `where`. A claim on a cancelled item becomes stale. `where` must be nonempty.
	 */
	cancelWhere?(ctx: Context, where: Labels, reason?: unknown): Promise<number>;
	/**
	 * Set the priority of every queued or claimed item whose labels include every
	 * entry of `where`. A claimed item keeps its claim and uses the new priority
	 * if it returns to the queue. `where` must be nonempty.
	 */
	reprioritize?(ctx: Context, where: Labels, priority: PriorityUpdate): Promise<number>;
	/**
	 * Return the selected live claims to the queue, claimable now. The attempt
	 * count is kept, so the next claim is the following attempt. The released
	 * claims become stale.
	 */
	abandon?(ctx: Context, selector: OwnerSelector): Promise<number>;
}

/** A queue whose `add()` accepts labels and which may provide the bulk methods. */
export interface LabeledQueue<Input, Output> extends Queue<Input, Output>, QueueExtensions {
	add(ctx: Context, input: Input, options?: LabeledAddOptions): Promise<QueueRef>;
}

/** Most labels one item may carry. */
export const MAXIMUM_LABELS = 16;

/** Validate and freeze labels before a store records them. */
export function labels(value: Labels | undefined): Labels {
	if (value === undefined) return Object.freeze({});
	if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new TypeError('Queue labels must be an object.');
	const entries = Object.entries(value);
	if (entries.length > MAXIMUM_LABELS) throw new RangeError(`Queue items carry at most ${MAXIMUM_LABELS} labels.`);
	for (const [name, label] of entries) {
		text(name, 'Queue label name');
		if (typeof label === 'string') text(label, 'Queue label value');
		else if (typeof label !== 'number' || !Number.isFinite(label)) throw new TypeError('Queue label values must be strings or finite numbers.');
	}
	return Object.freeze(Object.fromEntries(entries));
}

/** Validate a nonempty selector; an empty one would match every item. */
export function selector(where: Labels): Labels {
	const checked = labels(where);
	if (Object.keys(checked).length === 0) throw new TypeError('A label selector must name at least one label.');
	return checked;
}

/** Whether `item` carries every entry of `where`. */
export function matches(item: Labels, where: Labels): boolean {
	for (const [name, value] of Object.entries(where)) {
		if (!Object.hasOwn(item, name) || item[name] !== value) return false;
	}
	return true;
}

/** Validate an owner selector. */
export function owners(value: OwnerSelector): (owner: string) => boolean {
	if ('owner' in value && typeof value.owner === 'string' && value.owner.trim() !== '') return (owner) => owner === value.owner;
	if ('exceptOwner' in value && typeof value.exceptOwner === 'string' && value.exceptOwner.trim() !== '') {
		return (owner) => owner !== value.exceptOwner;
	}
	throw new TypeError('abandon() needs a nonempty owner or exceptOwner.');
}

/** Resolve a priority update to a safe integer. */
export function priority(update: PriorityUpdate, current: number, item: Labels): number {
	const next = typeof update === 'function' ? update(current, item) : update;
	if (!Number.isSafeInteger(next)) throw new TypeError('queue priority must be a safe integer.');
	return next;
}

function text(value: string, label: string): void {
	if (value.length === 0 || value.length > 256) throw new TypeError(`${label} must be 1 to 256 characters.`);
}

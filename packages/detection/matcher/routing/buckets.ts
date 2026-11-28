import type { IndexedObservationRule, MutableRuleBuckets, IndexedObservationRuleBuckets, MutableKeyBuckets, IndexedObservationKeyBuckets, MutableLiteralBuckets, IndexedObservationLiteralBuckets } from "./types.ts";

/** Merge any number of sequence-sorted rule buckets while preserving old matcher order. */
export function mergeRuleBucketList(
	buckets: readonly (readonly IndexedObservationRule[])[],
): readonly IndexedObservationRule[] {
	const nonEmpty = buckets.filter((bucket) => bucket.length > 0);
	if (nonEmpty.length === 0) {
		return [];
	}
	if (nonEmpty.length === 1) {
		return nonEmpty[0]!;
	}

	let merged = nonEmpty[0]!;
	for (const bucket of nonEmpty.slice(1)) {
		merged = mergeRuleBuckets(merged, bucket);
	}
	return merged;
}

/**
 * Merge two sequence-sorted rule buckets while preserving old matcher order.
 *
 * Both buckets are sorted by construction because the index is built in
 * registry order. The merge keeps the hot path linear in the number of
 * candidate rules for the observation instead of sorting a combined array.
 */
function mergeRuleBuckets(
	left: readonly IndexedObservationRule[],
	right: readonly IndexedObservationRule[],
): readonly IndexedObservationRule[] {
	const merged: IndexedObservationRule[] = [];
	let leftIndex = 0;
	let rightIndex = 0;

	while (leftIndex < left.length && rightIndex < right.length) {
		const leftRule = left[leftIndex]!;
		const rightRule = right[rightIndex]!;
		if (leftRule.sequence <= rightRule.sequence) {
			merged.push(leftRule);
			leftIndex += 1;
		} else {
			merged.push(rightRule);
			rightIndex += 1;
		}
	}

	return merged.concat(left.slice(leftIndex), right.slice(rightIndex));
}

/** Freeze kind buckets so callers do not mutate a shared runtime index. */
export function freezeRuleBuckets(buckets: MutableRuleBuckets): IndexedObservationRuleBuckets {
	for (const rules of Object.values(buckets)) {
		Object.freeze(rules);
	}
	return Object.freeze(buckets);
}

/** Freeze nested exact-key buckets so the index is safe to share across batches. */
export function freezeKeyBuckets(buckets: MutableKeyBuckets): IndexedObservationKeyBuckets {
	for (const keyBuckets of Object.values(buckets)) {
		for (const rules of Object.values(keyBuckets)) {
			Object.freeze(rules);
		}
		Object.freeze(keyBuckets);
	}
	return Object.freeze(buckets);
}

/** Freeze literal-prefilter buckets so the index is safe to share across batches. */
export function freezeLiteralBuckets(buckets: MutableLiteralBuckets): IndexedObservationLiteralBuckets {
	for (const rules of Object.values(buckets)) {
		Object.freeze(rules);
	}
	return Object.freeze(buckets);
}

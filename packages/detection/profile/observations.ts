import type { NormalizedObservationKind, NormalizedObservation } from "../observations/index.ts";

/** Target document reused by generated rule-profile observations. */
export const RULE_PROFILE_TARGET = {
	url: 'https://example.com/products',
	hostname: 'example.com',
} as const;

/** Default large-payload size used to make content-rule misses expose regex backtracking cost. */
export const DEFAULT_RULE_PROFILE_PAYLOAD_CHARS = 24_000;

/** Create a normalized observation for a rule-profile case. */
export function makeRuleProfileObservation(
	kind: NormalizedObservationKind,
	value: string | number | boolean,
	options: {
		readonly key?: string;
		readonly attributes?: NormalizedObservation['attributes'];
	} = {},
): NormalizedObservation {
	return {
		kind,
		interface: 'test',
		collector: 'test-fixture',
		target: RULE_PROFILE_TARGET,
		observedAt: 1_700_000_000_000,
		...(options.key === undefined ? {} : { key: options.key }),
		value,
		...(options.attributes === undefined ? {} : { attributes: options.attributes }),
	};
}

/** Build a React Router-style hydration payload that should miss technology markers. */
export function makeReactRouterHydrationPayload(
	length: number = getConfiguredHydrationPayloadLength(process.env.KAIJU_DEEPSCOPE_RULE_BENCH_PAYLOAD_CHARS),
): string {
	const bodyLength = Math.max(0, length);
	return `window.__reactRouterContext.streamController.enqueue("${'x'.repeat(bodyLength)}");`;
}

/** Build a Next.js-style hydration payload that should miss unrelated technology markers. */
export function makeNextHydrationPayload(
	length: number = getConfiguredHydrationPayloadLength(process.env.KAIJU_DEEPSCOPE_RULE_BENCH_PAYLOAD_CHARS),
): string {
	const bodyLength = Math.max(0, length);
	return `self.__next_f.push([1,"${'x'.repeat(bodyLength)}"]);`;
}

/** Accept a finite nonnegative integer payload length from configuration, otherwise retain the declared profiling default. */
function getConfiguredHydrationPayloadLength(value: string | undefined): number {
	if (!value) {
		return DEFAULT_RULE_PROFILE_PAYLOAD_CHARS;
	}

	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_RULE_PROFILE_PAYLOAD_CHARS;
}

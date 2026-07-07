import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const criticalClientHintsTechnologyDefinition = {
	id: "critical-client-hints",
	name: "Critical Client Hints",
	website: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Critical-CH",
	description: "Critical Client Hints mark selected Client Hints as important enough to retry the request when missing.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "critical-client-hints:header:0",
			kind: "header",
			key: "critical-ch",
			valuePattern: /.+/i,
			confidence: 90,
			description: "Main document response marks Client Hints as critical.",
		},
		{
			id: "critical-client-hints:responseHeader:1",
			kind: "responseHeader",
			key: "critical-ch",
			valuePattern: /.+/i,
			confidence: 90,
			description: "Captured response marks Client Hints as critical.",
		},
	],
} as const satisfies TechnologyDefinition;

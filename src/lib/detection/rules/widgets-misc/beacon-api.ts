import type { TechnologyDefinition } from '../../types';

/**
 * Captures an active browser capability or document standard from concrete page
 * evidence. These rules intentionally use protocol markers and API calls rather
 * than prose references so the card reflects runtime behavior.
 */
export const beaconApiTechnologyDefinition = {
	id: "beacon-api",
	name: "Beacon API",
	website: "https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API",
	description: "The Beacon API sends small analytics or telemetry payloads without blocking page unload.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "beacon-api:scriptContent:0",
			kind: "scriptContent",
			pattern: /navigator\.sendBeacon\s*\(/i,
			confidence: 80,
			description: "Bundled script content calls navigator.sendBeacon.",
		},
	],
} as const satisfies TechnologyDefinition;

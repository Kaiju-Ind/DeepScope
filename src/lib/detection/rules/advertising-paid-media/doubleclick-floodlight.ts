import type { TechnologyDefinition } from '../../types';

export const doubleclickFloodlightTechnologyDefinition = {
	id: "doubleclick-floodlight",
	name: "DoubleClick Floodlight",
	website: "https://support.google.com/ds/answer/6029713?hl=en",
	icon: "DoubleClick.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "doubleclick-floodlight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/fls\\.doubleclick\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doubleclick-floodlight:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.doubleclick\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doubleclick-floodlight:scriptContent:2",
			kind: "scriptContent",
			pattern: new RegExp("fls\\.doubleclick\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const fanplayrTechnologyDefinition = {
	id: "fanplayr",
	name: "Fanplayr",
	website: "https://fanplayr.com",
	description: "Fanplayr is a real-time insights platform that provides website optimisation and personalisation solutions for businesses.",
	icon: "Fanplayr.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "fanplayr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.fanplayr\\.com\\/.+\\/([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fanplayr:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.fanplayr.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fanplayr:jsGlobal:2",
			kind: "jsGlobal",
			property: "fanplayr.platform.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

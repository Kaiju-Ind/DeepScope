import type { TechnologyDefinition } from '../../types';

export const webengageTechnologyDefinition = {
	id: "webengage",
	name: "WebEngage",
	website: "https://webengage.com",
	description: "WebEngage is a customer data platform and marketing automation suite.",
	icon: "WebEngage.png",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "webengage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.webengage\\.co(?:m)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webengage:jsGlobal:1",
			kind: "jsGlobal",
			property: "webengage.__v",
			valuePattern: new RegExp("([\\d.]+)"),
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

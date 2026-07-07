import type { TechnologyDefinition } from '../../types';

export const goodappsTechnologyDefinition = {
	id: "goodapps",
	name: "GoodApps",
	website: "https://goodapps.io",
	description: "GoodApps is an ecommerce tools builder that provides customizable solutions for creating and managing online stores.",
	icon: "GoodApps.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "goodapps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.goodapps\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "goodapps:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.goodapps\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const randemretailTechnologyDefinition = {
	id: "randemretail",
	name: "RandemRetail",
	website: "https://www.randemretail.com",
	description: "RandemRetail is a platform that centralizes multichannel selling operations into a single interface.",
	icon: "RandemRetail.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "randemretail:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cc\\.randemcommerce\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

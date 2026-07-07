import type { TechnologyDefinition } from '../../types';

export const commsTechnologyDefinition = {
	id: "comms",
	name: "Comms",
	website: "https://comms.dev",
	description: "Comms is an all-in-one ecommerce platform.",
	icon: "Comms.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "comms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.startcomms\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "comms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("comms\\.dev", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

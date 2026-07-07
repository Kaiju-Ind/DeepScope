import type { TechnologyDefinition } from '../../types';

export const radialEcommerceTechnologyDefinition = {
	id: "radial-ecommerce",
	name: "Radial Ecommerce",
	website: "https://www.radial.com",
	description: "Radial Ecommerce is a platform that streamlines order processing, from checkout to final delivery, to support customer fulfillment.",
	icon: "Radial.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "radial-ecommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.radial\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "radial-ecommerce:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.radial\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

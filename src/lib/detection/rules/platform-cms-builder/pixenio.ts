import type { TechnologyDefinition } from '../../types';

export const pixenioTechnologyDefinition = {
	id: "pixenio",
	name: "Pixenio",
	website: "https://pixenio.com",
	description: "Pixenio is a responsive website builder that enables users to create fast, SEO-optimized sites with simplicity comparable to managing social media profiles.",
	icon: "Pixenio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pixenio:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^pxnssid$", "i"),
			description: "Cookie name matches a known technology marker.",
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

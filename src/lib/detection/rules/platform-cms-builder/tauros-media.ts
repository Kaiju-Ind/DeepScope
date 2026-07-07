import type { TechnologyDefinition } from '../../types';

export const taurosMediaTechnologyDefinition = {
	id: "tauros-media",
	name: "Tauros Media",
	website: "https://www.taurosmedia.com",
	description: "Tauros Media is an ecommerce and omni-channel system provider offering integrated solutions for businesses to manage online and offline operations.",
	icon: "TaurosMedia.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "tauros-media:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.taurosmedia\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

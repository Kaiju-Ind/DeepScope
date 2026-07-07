import type { TechnologyDefinition } from '../../types';

export const zienyTechnologyDefinition = {
	id: "zieny",
	name: "Zieny",
	website: "https://zieny.com",
	description: "Zieny is a platform that enables businesses to integrate 3D and augmented reality (AR) into websites, providing an interactive product experience without complex implementation.",
	icon: "Zieny.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "zieny:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ar-view-zieny\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const primeleadsTechnologyDefinition = {
	id: "primeleads",
	name: "Primeleads",
	website: "https://primeleads.de",
	description: "Primeleads is a tool that identifies visitors on your site and personalises the website experience for each individual visitor.",
	icon: "Primeleads.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "primeleads:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.primeleads\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const drLeonardoTechnologyDefinition = {
	id: "dr-leonardo",
	name: "Dr. Leonardo",
	website: "https://www.dr-leonardo.com",
	description: "Dr. Leonardo is an all-in-one eHealth platform designed for healthcare professionals, providing tools for patient engagement, telemedicine, and practice management.",
	icon: "DrLeonardo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dr-leonardo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sitebuilder\\.dr-leonardo\\.com"),
			description: "Script source URL matches a known technology marker.",
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

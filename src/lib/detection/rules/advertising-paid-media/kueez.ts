import type { TechnologyDefinition } from '../../types';

export const kueezTechnologyDefinition = {
	id: "kueez",
	name: "Kueez",
	website: "https://weare.kueez.com",
	description: "Kueez is a platform offering data-driven solutions tailored for publishers to enhance advertising strategies.",
	icon: "Kueez.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "kueez:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.kueez\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const chiromatrixTechnologyDefinition = {
	id: "chiromatrix",
	name: "Chiromatrix",
	website: "https://imatrix.com/chiropractic-marketing",
	description: "Chiromatrix is a website platform designed specifically for chiropractic practices, providing tools and infrastructure to manage online presence, content, and patient engagement.",
	icon: "Chiromatrix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "chiromatrix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("apps\\.chiromatrixbase\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

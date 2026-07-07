import type { TechnologyDefinition } from '../../types';

export const nopaperformsTechnologyDefinition = {
	id: "nopaperforms",
	name: "NoPaperForms",
	website: "https://www.nopaperforms.com",
	description: "NoPaperForms is a cloud-based platform that automates and manages student enrollment processes.",
	icon: "NoPaperForms.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "nopaperforms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("track\\.nopaperforms\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

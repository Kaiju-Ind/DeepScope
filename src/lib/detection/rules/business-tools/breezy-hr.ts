import type { TechnologyDefinition } from '../../types';

export const breezyHrTechnologyDefinition = {
	id: "breezy-hr",
	name: "Breezy HR",
	website: "https://breezy.hr",
	description: "Breezy HR is a recruiting software and applicant tracking system designed to streamline hiring processes.",
	icon: "BreezyHR.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "breezy-hr:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.breezy\\.hr"),
			description: "Script content contains a bounded technology signature.",
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

import type { TechnologyDefinition } from '../../types';

export const famlyTechnologyDefinition = {
	id: "famly",
	name: "Famly",
	website: "https://www.famly.co",
	description: "Famly is a digital platform enabling early educators and families to collaborate, share responsibilities, and support child development.",
	icon: "Famly.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "famly:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.famly\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

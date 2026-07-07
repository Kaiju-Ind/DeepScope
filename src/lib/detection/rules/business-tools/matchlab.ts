import type { TechnologyDefinition } from '../../types';

export const matchlabTechnologyDefinition = {
	id: "matchlab",
	name: "Matchlab",
	website: "https://match-lab.nl",
	description: "Matchlab is a recruitment platform that enables employers to attract top talent by directly identifying and engaging the best candidates.",
	icon: "Matchlab.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "matchlab:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("matchlabSections"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "matchlab:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("matchlabsections"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

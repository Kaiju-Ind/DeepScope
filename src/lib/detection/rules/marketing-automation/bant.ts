import type { TechnologyDefinition } from '../../types';

export const bantTechnologyDefinition = {
	id: "bant",
	name: "Bant",
	website: "https://bant.io",
	description: "Bant is a B2B lead generation platform that automates client prospecting and engagement to streamline business development processes.",
	icon: "Bant.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bant:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.bant\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

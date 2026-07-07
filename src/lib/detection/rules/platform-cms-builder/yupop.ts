import type { TechnologyDefinition } from '../../types';

export const yupopTechnologyDefinition = {
	id: "yupop",
	name: "Yupop",
	website: "https://yupop.com",
	description: "Yupop is a platform that enables users to create an online store, requiring no monthly subscription and only charging fees when sales are made.",
	icon: "Yupop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "yupop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.yupopstorecdn\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

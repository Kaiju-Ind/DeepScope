import type { TechnologyDefinition } from '../../types';

export const cleverdataTechnologyDefinition = {
	id: "cleverdata",
	name: "CleverData",
	website: "https://cleverdata.ru",
	description: "CleverData is a CDP platform that manages customer data and enables personalized user experiences through robust data processing capabilities.",
	icon: "CleverData.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cleverdata:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.cdp\\.cleverdata\\.ru"),
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

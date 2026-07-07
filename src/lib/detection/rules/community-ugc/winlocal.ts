import type { TechnologyDefinition } from '../../types';

export const winlocalTechnologyDefinition = {
	id: "winlocal",
	name: "WinLocal",
	website: "https://winlocal.ru",
	description: "WinLocal is a monitoring and feedback collection service that helps businesses track reviews and improve visibility on maps and search results.",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "winlocal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.winlocal\\.ru"),
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

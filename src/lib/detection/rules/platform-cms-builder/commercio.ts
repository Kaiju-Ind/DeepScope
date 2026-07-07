import type { TechnologyDefinition } from '../../types';

export const commercioTechnologyDefinition = {
	id: "commercio",
	name: "Commercio",
	website: "https://commercio.com",
	description: "Commercio is a platform that allows promotional product distributors to set up fully branded company stores.",
	icon: "Commercio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commercio:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("(?:mycommercio|commerciostores)\\.com\\/"),
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

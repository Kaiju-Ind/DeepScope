import type { TechnologyDefinition } from '../../types';

export const asappTechnologyDefinition = {
	id: "asapp",
	name: "Asapp",
	website: "https://www.asapp.com",
	description: "Asapp is a platform that guides agents in providing responses to queries using AI technology.",
	icon: "Asapp.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "asapp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.asapp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "asapp:jsGlobal:1",
			kind: "jsGlobal",
			property: "ASAPP.Host",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

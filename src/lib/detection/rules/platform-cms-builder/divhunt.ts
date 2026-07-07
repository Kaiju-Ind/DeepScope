import type { TechnologyDefinition } from '../../types';

export const divhuntTechnologyDefinition = {
	id: "divhunt",
	name: "Divhunt",
	website: "https://www.divhunt.com",
	description: "Divhunt is an SPA builder.",
	icon: "Divhunt.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "divhunt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("divhunt-site\\.\\w-cdn\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "divhunt:jsGlobal:1",
			kind: "jsGlobal",
			property: "Divhunt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

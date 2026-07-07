import type { TechnologyDefinition } from '../../types';

export const clientifyTechnologyDefinition = {
	id: "clientify",
	name: "Clientify",
	website: "https://clientify.com",
	description: "Clientify is a marketing and sales automation platform designed to help businesses grow.",
	icon: "Clientify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "clientify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.clientify\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clientify:jsGlobal:1",
			kind: "jsGlobal",
			property: "trackerUrl",
			valuePattern: new RegExp("analytics\\.clientify\\.net"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

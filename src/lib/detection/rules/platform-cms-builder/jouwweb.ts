import type { TechnologyDefinition } from '../../types';

export const jouwwebTechnologyDefinition = {
	id: "jouwweb",
	name: "JouwWeb",
	website: "https://www.jouwweb.nl",
	description: "JouwWeb is an online website builder that allows internet users to create own website.",
	icon: "JouwWeb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jouwweb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:cdn)?\\.(?:jwwb|jouwweb)\\.nl\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jouwweb:jsGlobal:1",
			kind: "jsGlobal",
			property: "JOUWWEB",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

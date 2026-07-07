import type { TechnologyDefinition } from '../../types';

export const qualtricsTechnologyDefinition = {
	id: "qualtrics",
	name: "Qualtrics",
	website: "https://www.qualtrics.com",
	description: "Qualtrics is an cloud-based platform for creating and distributing web-based surveys.",
	icon: "Qualtrics.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "qualtrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.qualtrics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qualtrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "QSI.ClientSideTargeting",
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

import type { TechnologyDefinition } from '../../types';

export const idetaTechnologyDefinition = {
	id: "ideta",
	name: "Ideta",
	website: "https://www.ideta.io",
	description: "Ideta is a platform that provides chatbots and callbots to streamline company operations through AI and automation.",
	icon: "Ideta.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ideta:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ideta-prod\\.appspot\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ideta:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkideta_platoon",
			description: "Page-owned global matches a known technology marker.",
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

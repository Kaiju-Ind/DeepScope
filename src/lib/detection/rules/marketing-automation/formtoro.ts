import type { TechnologyDefinition } from '../../types';

export const formtoroTechnologyDefinition = {
	id: "formtoro",
	name: "Formtoro",
	website: "https://www.formtoro.com",
	description: "Formtoro is a platform that converts popup signups into marketing insights by collecting zero-party data through popups, quizzes, and post-purchase surveys.",
	icon: "Formtoro.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "formtoro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.formtoro\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "formtoro:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("sdk\\.formtoro\\.com"),
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

import type { TechnologyDefinition } from '../../types';

export const alloincognitoTechnologyDefinition = {
	id: "alloincognito",
	name: "AlloIncognito",
	website: "https://www.alloincognito.ru",
	description: "AlloIncognito is a platform that provides communication capabilities to and within Russia.",
	icon: "AlloIncognito.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "alloincognito:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.alloincognito\\.ru"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

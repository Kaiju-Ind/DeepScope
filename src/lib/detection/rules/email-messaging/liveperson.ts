import type { TechnologyDefinition } from '../../types';

export const livepersonTechnologyDefinition = {
	id: "liveperson",
	name: "LivePerson",
	website: "https://www.liveperson.com",
	description: "LivePerson is a tool for conversational chatbots and messaging.",
	icon: "LivePerson.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "liveperson:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.(?:liveperson|contactatonce)?\\.(?:com|net|co\\.uk)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "liveperson:jsGlobal:1",
			kind: "jsGlobal",
			property: "lpTag.Chronos",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

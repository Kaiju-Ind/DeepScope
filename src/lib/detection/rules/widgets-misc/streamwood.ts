import type { TechnologyDefinition } from '../../types';

export const streamwoodTechnologyDefinition = {
	id: "streamwood",
	name: "Streamwood",
	website: "https://streamwood.ru",
	description: "Streamwood is a call back and chat system designed to facilitate efficient communication.",
	icon: "Streamwood.svg",
	categories: [
		"widgets-misc",
		"email-messaging",
	],
	rules: [
		{
			id: "streamwood:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clients\\.streamwood\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "streamwood:jsGlobal:1",
			kind: "jsGlobal",
			property: "__STREAMWOOD_MUTEX_QP3",
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

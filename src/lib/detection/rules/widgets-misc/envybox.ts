import type { TechnologyDefinition } from '../../types';

export const envyboxTechnologyDefinition = {
	id: "envybox",
	name: "Envybox",
	website: "https://envybox.io",
	description: "Envybox is a multiservice for increasing sales.",
	icon: "Envybox.svg",
	categories: [
		"widgets-misc",
		"email-messaging",
	],
	rules: [
		{
			id: "envybox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.saas-support\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "envybox:jsGlobal:1",
			kind: "jsGlobal",
			property: "EnvyWidget",
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

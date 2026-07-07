import type { TechnologyDefinition } from '../../types';

export const adaTechnologyDefinition = {
	id: "ada",
	name: "Ada",
	website: "https://www.ada.cx",
	description: "Ada is an automated customer experience company that provides chat bots used in customer support.",
	icon: "Ada.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ada:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ada\\.support"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ada:jsGlobal:1",
			kind: "jsGlobal",
			property: "__AdaEmbedConstructor",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ada:jsGlobal:2",
			kind: "jsGlobal",
			property: "adaEmbed",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:ada:ada:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

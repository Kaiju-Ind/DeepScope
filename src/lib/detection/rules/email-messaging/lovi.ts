import type { TechnologyDefinition } from '../../types';

export const loviTechnologyDefinition = {
	id: "lovi",
	name: "Lovi",
	website: "https://lovi.ai",
	description: "Lovi is a tool that enables the creation of customized ChatGPT instances for customer support, delivering automated, and personalized customer service.",
	icon: "Lovi.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "lovi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.lovi\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lovi:jsGlobal:1",
			kind: "jsGlobal",
			property: "__loviMsgHandler",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lovi:jsGlobal:2",
			kind: "jsGlobal",
			property: "__loviWidgetClicksBound",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

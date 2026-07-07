import type { TechnologyDefinition } from '../../types';

export const neoasistTechnologyDefinition = {
	id: "neoasist",
	name: "NeoAsist",
	website: "https://neoassist.com",
	description: "NeoAssist is an omnichannel customer service platform from Brazil focused on improving brand visibility across search engines and AI-driven platforms such as Google and GPT-based systems.",
	icon: "NeoAssist.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "neoasist:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.neoassist\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "neoasist:jsGlobal:1",
			kind: "jsGlobal",
			property: "NeoAssistTag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

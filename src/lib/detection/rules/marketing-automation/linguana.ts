import type { TechnologyDefinition } from '../../types';

export const linguanaTechnologyDefinition = {
	id: "linguana",
	name: "Linguana",
	website: "https://www.linguana.io/",
	description: "Linguana is a tool that provides AI-driven multi-language support ensuring SEO performance with translations and translated slugs for seamless multilingual user experiences.",
	icon: "Linguana.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "linguana:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.linguana\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "linguana:jsGlobal:1",
			kind: "jsGlobal",
			property: "LINGUANA_MAIN_LANGUAGE_CODE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "linguana:jsGlobal:2",
			kind: "jsGlobal",
			property: "LINGUANA_SHOW_LANGUAGE_CODE",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

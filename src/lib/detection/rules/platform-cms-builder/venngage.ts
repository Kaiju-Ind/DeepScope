import type { TechnologyDefinition } from '../../types';

export const venngageTechnologyDefinition = {
	id: "venngage",
	name: "Venngage",
	website: "https://venngage.com",
	description: "Venngage is a platform that enables the creation of infographics using AI-powered tools to streamline design and visualization.",
	icon: "Venngage.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "venngage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("infograph\\.venngage\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "venngage:jsGlobal:1",
			kind: "jsGlobal",
			property: "__venngage_embed_script_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

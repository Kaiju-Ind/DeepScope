import type { TechnologyDefinition } from '../../types';

export const talentionTechnologyDefinition = {
	id: "talention",
	name: "Talention",
	website: "https://www.talention.com",
	description: "Talention is a recruitment marketing software designed to help companies attract, engage, and convert job candidates through data-driven strategies and tools.",
	icon: "Talention.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "talention:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.eu\\.talention\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "talention:jsGlobal:1",
			kind: "jsGlobal",
			property: "myTalentionConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

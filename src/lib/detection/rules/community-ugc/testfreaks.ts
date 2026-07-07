import type { TechnologyDefinition } from '../../types';

export const testfreaksTechnologyDefinition = {
	id: "testfreaks",
	name: "TestFreaks",
	website: "https://www.testfreaks.com",
	description: "TestFreaks is an impartial source that provides product and seller review content for ecommerce websites.",
	icon: "TestFreaks.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "testfreaks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.testfreaks\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "testfreaks:jsGlobal:1",
			kind: "jsGlobal",
			property: "applyTestFreaks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "testfreaks:jsGlobal:2",
			kind: "jsGlobal",
			property: "testFreaks",
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

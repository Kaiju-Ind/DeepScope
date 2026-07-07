import type { TechnologyDefinition } from '../../types';

export const ruttlTechnologyDefinition = {
	id: "ruttl",
	name: "Ruttl",
	website: "https://ruttl.com",
	description: "Ruttl is a platform that enables visual and design feedback by allowing users to review layouts, content, and bugs across websites, applications, PDFs, and images.",
	icon: "Ruttl.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "ruttl:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.ruttl\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ruttl:jsGlobal:1",
			kind: "jsGlobal",
			property: "__RUTTL_PRODUCT__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ruttl:jsGlobal:2",
			kind: "jsGlobal",
			property: "webpackChunkruttl",
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

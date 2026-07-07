import type { TechnologyDefinition } from '../../types';

export const posifyTechnologyDefinition = {
	id: "posify",
	name: "Posify",
	website: "https://www.posify.me",
	description: "Posify is an integrated platform providing ecommerce and electronic point-of-sale (ePOS) solutions for managing online and in-store sales.",
	icon: "Posify.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "posify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.posify\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "posify:jsGlobal:1",
			kind: "jsGlobal",
			property: "posifyFormatDate",
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

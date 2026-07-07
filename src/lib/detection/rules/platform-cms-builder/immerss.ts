import type { TechnologyDefinition } from '../../types';

export const immerssTechnologyDefinition = {
	id: "immerss",
	name: "Immerss",
	website: "https://www.immerss.live",
	description: "Immerss is a platform that offers 1-to-1 Digital Clienteling, allowing customers to connect with businesses in real time via dynamic video, chat, and messaging for a personalized shopping experience.",
	icon: "Immerss.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "immerss:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.immerss\\.live\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "immerss:jsGlobal:1",
			kind: "jsGlobal",
			property: "Immerss.service_id",
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

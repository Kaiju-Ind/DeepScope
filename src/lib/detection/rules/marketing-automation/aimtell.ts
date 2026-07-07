import type { TechnologyDefinition } from '../../types';

export const aimtellTechnologyDefinition = {
	id: "aimtell",
	name: "Aimtell",
	website: "https://aimtell.com",
	description: "Aimtell is a cloud-hosted marketing platform that allows digital marketers and businesses to deliver web-based push notifications.",
	icon: "Aimtell.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "aimtell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.aimtell\\.\\w+\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aimtell:jsGlobal:1",
			kind: "jsGlobal",
			property: "_aimtellLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aimtell:jsGlobal:2",
			kind: "jsGlobal",
			property: "_aimtellPushToken",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aimtell:jsGlobal:3",
			kind: "jsGlobal",
			property: "_aimtellWebhook",
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

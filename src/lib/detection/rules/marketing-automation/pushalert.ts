import type { TechnologyDefinition } from '../../types';

export const pushalertTechnologyDefinition = {
	id: "pushalert",
	name: "PushAlert",
	website: "https://pushalert.co",
	description: "PushAlert is a multi-channel platform that offers push notifications and onsite messaging to enhance customer engagement.",
	icon: "PushAlert.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushalert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.pushalert\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pushalert:jsGlobal:1",
			kind: "jsGlobal",
			property: "pushalert_manifest_file",
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

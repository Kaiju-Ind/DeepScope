import type { TechnologyDefinition } from '../../types';

export const emojicomTechnologyDefinition = {
	id: "emojicom",
	name: "Emojicom",
	website: "https://emojicom.io",
	description: "Emojicom is a tool for collecting feedback through emojis, enabling the capture of visitors' emotions.",
	icon: "Emojicom.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "emojicom:jsGlobal:0",
			kind: "jsGlobal",
			property: "$emojicom",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "emojicom:jsGlobal:1",
			kind: "jsGlobal",
			property: "EMOJICOM_BASE_PATH",
			valuePattern: new RegExp("cdn\\.emojicom\\.io\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "emojicom:jsGlobal:2",
			kind: "jsGlobal",
			property: "emojicom",
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

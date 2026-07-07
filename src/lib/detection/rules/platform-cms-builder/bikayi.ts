import type { TechnologyDefinition } from '../../types';

export const bikayiTechnologyDefinition = {
	id: "bikayi",
	name: "Bikayi",
	website: "https://bikayi.com",
	description: "Bikayi is a WhatsApp-integrated ecommerce store.",
	icon: "Bikayi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bikayi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.bikayi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bikayi:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("bikayi-chat\\.appspot\\.com"),
			description: "Script content contains a bounded technology signature.",
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

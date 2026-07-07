import type { TechnologyDefinition } from '../../types';

export const payhereTechnologyDefinition = {
	id: "payhere",
	name: "PayHere",
	website: "https://payhere.co",
	description: "PayHere is a platform that provides payment links to facilitate online payment collection.",
	icon: "PayHere.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payhere:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.payhere\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "payhere:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_pay_here_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

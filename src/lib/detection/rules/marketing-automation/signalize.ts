import type { TechnologyDefinition } from '../../types';

export const signalizeTechnologyDefinition = {
	id: "signalize",
	name: "Signalize",
	website: "https://www.signalize.com",
	description: "Signalize is a platform that enables sending browser notifications, including targeted push notifications.",
	icon: "Signalize.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "signalize:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("api\\.signalize\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "signalize:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("api\\.signalize\\.com", "i"),
			description: "Response header matches a known technology marker.",
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

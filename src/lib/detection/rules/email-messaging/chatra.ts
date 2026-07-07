import type { TechnologyDefinition } from '../../types';

export const chatraTechnologyDefinition = {
	id: "chatra",
	name: "Chatra",
	website: "https://chatra.com",
	description: "Chatra is a cloud-based live chat platform aimed at small businesses and ecommerce retailers.",
	icon: "Chatra.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("call\\.chatra\\.io\\/chatra\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chatra:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("chat\\.chatra\\.io\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "chatra:jsGlobal:2",
			kind: "jsGlobal",
			property: "ChatraID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatra:jsGlobal:3",
			kind: "jsGlobal",
			property: "ChatraSetup",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const wisepopsTechnologyDefinition = {
	id: "wisepops",
	name: "Wisepops",
	website: "https://wisepops.com",
	description: "Wisepops is an intelligent popup and marketing automation system that offers marketers a single platform from which to create and manage website popups.",
	icon: "Wisepops.svg",
	categories: [
		"widgets-misc",
		"marketing-automation",
	],
	rules: [
		{
			id: "wisepops:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("loader\\.wisepops\\.com\\/get-loader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wisepops:jsGlobal:1",
			kind: "jsGlobal",
			property: "WisePopsObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wisepops:jsGlobal:2",
			kind: "jsGlobal",
			property: "wisepops._api",
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

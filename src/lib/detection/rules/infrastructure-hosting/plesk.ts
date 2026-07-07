import type { TechnologyDefinition } from '../../types';

export const pleskTechnologyDefinition = {
	id: "plesk",
	name: "Plesk",
	website: "https://www.plesk.com/",
	description: "Plesk is a web hosting and server data centre automation software with a control panel developed for Linux and Windows-based retail hosting service providers.",
	icon: "Plesk.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "plesk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("common\\.js\\?plesk"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plesk:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Plesk(?:L|W)in", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "plesk:header:2",
			kind: "header",
			key: "X-Powered-By-Plesk",
			valuePattern: new RegExp("^Plesk", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "plesk:jsGlobal:3",
			kind: "jsGlobal",
			property: "Plesk.Form",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "plesk:header:4",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^plesk(?:l|w)in", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "plesk:header:5",
			kind: "header",
			key: "x-powered-by-plesk",
			valuePattern: new RegExp("^plesk", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:parallels:parallels_plesk_panel:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

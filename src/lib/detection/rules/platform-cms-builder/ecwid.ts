import type { TechnologyDefinition } from '../../types';

export const ecwidTechnologyDefinition = {
	id: "ecwid",
	name: "Ecwid",
	website: "https://www.ecwid.com/",
	description: "Ecwid is a shopping cart plugin that turns any existing website into an online store.",
	icon: "ecwid.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ecwid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https:\\/\\/app\\.multiscreenstore\\.com\\/script\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ecwid:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("https:\\/\\/app\\.ecwid\\.com\\/script\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ecwid:jsGlobal:2",
			kind: "jsGlobal",
			property: "Ecwid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ecwid:jsGlobal:3",
			kind: "jsGlobal",
			property: "EcwidCart",
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

import type { TechnologyDefinition } from '../../types';

export const dialogtabTechnologyDefinition = {
	id: "dialogtab",
	name: "DialogTab",
	website: "https://dialogtab.com",
	description: "DialogTab is a conversational commerce platform that automates order intake and product guidance for users through WhatsApp-based messaging interactions.",
	icon: "DialogTab.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dialogtab:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.dialogtab\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dialogtab:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.dialogtab\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

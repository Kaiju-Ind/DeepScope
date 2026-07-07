import type { TechnologyDefinition } from '../../types';

export const rabfyTechnologyDefinition = {
	id: "rabfy",
	name: "Rabfy",
	website: "https://rabfy.com",
	description: "Rabfy is a platform that enables building a print-on-demand business model that operates without the need to maintain physical inventory.",
	icon: "Rabfy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rabfy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("(?:cdn|www)\\.rabfy\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "rabfy:header:1",
			kind: "header",
			key: "Powered-By",
			valuePattern: new RegExp("^Rabfy$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "rabfy:header:2",
			kind: "header",
			key: "powered-by",
			valuePattern: new RegExp("^rabfy$", "i"),
			description: "Response header matches a known technology marker.",
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

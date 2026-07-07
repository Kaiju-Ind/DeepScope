import type { TechnologyDefinition } from '../../types';

export const microweberTechnologyDefinition = {
	id: "microweber",
	name: "Microweber",
	website: "https://microweber.com",
	description: "Microweber is an AI-based platform that enables the creation of fully functional websites without coding.",
	icon: "Microweber.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "microweber:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("[Mm]icroweber(?:\\/includes)?(?:\\/api)?(?:\\/libs)?[\\w\\.\\/-]{0,45}(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "microweber:dom:1",
			kind: "dom",
			selector: "meta[content='Microweber']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "microweber:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("[mm]icroweber(?:\\/includes)?(?:\\/api)?(?:\\/libs)?[\\w\\.\\/-]{0,45}(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "microweber:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Microweber$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:microweber:microweber:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

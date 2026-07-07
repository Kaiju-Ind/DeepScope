import type { TechnologyDefinition } from '../../types';

export const pimcoreTechnologyDefinition = {
	id: "pimcore",
	name: "Pimcore",
	website: "https://pimcore.com/en/digital-experience-platform",
	description: "Pimcore is an open-source digital platform that aggregates, enriches, and manages enterprise data and provides up-to-date, consistent, and personalised experiences to customers.",
	icon: "pimcore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pimcore:dom:0",
			kind: "dom",
			selector: ".pimcore_area_content",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "pimcore:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^pimcore$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "pimcore:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/pimcorecore\\/js\\/targeting\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pimcore:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^pimcore$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:pimcore:pimcore:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;

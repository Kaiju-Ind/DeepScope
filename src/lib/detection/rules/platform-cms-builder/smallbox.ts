import type { TechnologyDefinition } from '../../types';

export const smallboxTechnologyDefinition = {
	id: "smallbox",
	name: "Smallbox",
	website: "https://www.smallbox.ca",
	description: "Smallbox is a Canadian CMS platform and web agency offering a proprietary content management system with support for custom development, SEO tools, and digital marketing.",
	icon: "Smallbox.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smallbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smallbox\\.ca\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smallbox:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Smallbox\\sCMS\\s(?:([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "smallbox:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^smallbox\\scms\\s(?:([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
			"recurring",
		],
	},
	requires: [
		"php",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const generateblocksTechnologyDefinition = {
	id: "generateblocks",
	name: "GenerateBlocks",
	website: "https://generateblocks.com",
	description: "GenerateBlocks is a small collection of lightweight WordPress blocks for the WordPress Block Editor.",
	icon: "GenerateBlocks.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "generateblocks:dom:0",
			kind: "dom",
			selector: "link#generateblocks-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "generateblocks:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* id=[^>]+generateblocks-css"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

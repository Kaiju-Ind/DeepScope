import type { TechnologyDefinition } from '../../types';

export const weblocksTechnologyDefinition = {
	id: "weblocks",
	name: "WeBlocks",
	website: "https://www.weblocks.com",
	description: "WeBlocks is an educational platform for creating custom JavaScript and Webflow projects using Blocks.",
	icon: "WeBlocks.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "weblocks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/weblocks\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
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
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;

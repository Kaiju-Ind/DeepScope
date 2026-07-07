import type { TechnologyDefinition } from '../../types';

export const dmPolopolyTechnologyDefinition = {
	id: "dm-polopoly",
	name: "DM Polopoly",
	website: "https://www.atex.com/products/dm-polopoly",
	description: "DM Polopoly is a web content management solution focused on enhancing the user experience built by Atex.",
	icon: "DM Polopoly.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dm-polopoly:dom:0",
			kind: "dom",
			selector: "img[data-src*='/polopoly_fs/'], link[href*='/polopoly_fs/'], img[src*='/polopoly_fs/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;

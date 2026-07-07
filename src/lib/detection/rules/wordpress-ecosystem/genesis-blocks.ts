import type { TechnologyDefinition } from '../../types';

export const genesisBlocksTechnologyDefinition = {
	id: "genesis-blocks",
	name: "Genesis blocks",
	website: "https://www.studiopress.com/genesis-blocks/",
	description: "Premium block library & block editor enhancements from StudioPress.",
	icon: "genesis-blocks.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "genesis-blocks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/genesis-blocks\\/lib\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "genesis-blocks:html:1",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=[\"']wp-block-atomic-blocks-*"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "genesis-blocks:dom:2",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/atomic-blocks']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "genesis-blocks:dom:3",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/genesis-blocks']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

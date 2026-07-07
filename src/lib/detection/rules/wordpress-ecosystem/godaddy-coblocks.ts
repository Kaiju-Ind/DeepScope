import type { TechnologyDefinition } from '../../types';

export const godaddyCoblocksTechnologyDefinition = {
	id: "godaddy-coblocks",
	name: "GoDaddy CoBlocks",
	website: "https://github.com/godaddy-wordpress/coblocks",
	description: "GoDaddy CoBlocks is a suite of professional page building content blocks for the WordPress Gutenberg block editor.",
	icon: "GoDaddy.svg",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "godaddy-coblocks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/coblocks\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "godaddy-coblocks:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/coblocks/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

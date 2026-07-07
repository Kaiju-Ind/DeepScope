import type { TechnologyDefinition } from '../../types';

export const svgSupportTechnologyDefinition = {
	id: "svg-support",
	name: "SVG Support",
	website: "https://github.com/wp-plugins/svg-support",
	description: "SVG Support is a WordPress plugin which allows you to safely upload SVG files to your media library and use them like any other image.",
	icon: "SVG Support.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "svg-support:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/svg-support\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "svg-support:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/svg-support/']",
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

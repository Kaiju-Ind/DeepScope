import type { TechnologyDefinition } from '../../types';

export const metroCreativexTechnologyDefinition = {
	id: "metro-creativex",
	name: "Metro CreativeX",
	website: "https://themeisle.com/themes/metrox/",
	description: "Metro CreativeX is a free WordPress theme with a fully responsive design.",
	icon: "MetroCreativeX.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "metro-creativex:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/metro-creativex\\/js\\/.*\\.js\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

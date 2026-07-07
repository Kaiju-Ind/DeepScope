import type { TechnologyDefinition } from '../../types';

export const pixelyoursiteTechnologyDefinition = {
	id: "pixelyoursite",
	name: "PixelYourSite",
	website: "https://www.pixelyoursite.com",
	description: "PixelyourSite is now probably the most complex tracking tool for WordPress, managing the Facebook Pixel, Google Analytics, Google Ads Remarketing, Pinterest Tag, Bing Tag, and virtually any other script.",
	icon: "PixelYourSite.png",
	categories: [
		"wordpress-ecosystem",
		"analytics",
	],
	rules: [
		{
			id: "pixelyoursite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/pixelyoursite\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pixelyoursite:jsGlobal:1",
			kind: "jsGlobal",
			property: "pys.Facebook",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixelyoursite:jsGlobal:2",
			kind: "jsGlobal",
			property: "pysOptions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pixelyoursite:jsGlobal:3",
			kind: "jsGlobal",
			property: "pys_generate_token",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:pixelyoursite:pixelyoursite:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

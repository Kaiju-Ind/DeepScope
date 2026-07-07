import type { TechnologyDefinition } from '../../types';

export const hestiaTechnologyDefinition = {
	id: "hestia",
	name: "Hestia",
	website: "https://themeisle.com/themes/hestia/",
	description: "Hestia is a modern WordPress theme for professionals a multipurpose one-page design, widgetized footer, blog/news page, and a clean look.",
	icon: "ThemeIsle.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hestia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("themes\\/hestia.*\\.js(?:\\?ver=([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hestia:dom:1",
			kind: "dom",
			selector: "body[class*='hestia-theme']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hestia:dom:2",
			kind: "dom",
			selector: "link[id*='hestia']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

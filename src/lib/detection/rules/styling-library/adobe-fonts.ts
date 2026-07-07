import type { TechnologyDefinition } from '../../types';

export const adobeFontsTechnologyDefinition = {
	id: "adobe-fonts",
	name: "Adobe Fonts",
	website: "https://fonts.adobe.com",
	description: "Adobe Fonts is a web-based service providing access to a vast library of high-quality fonts for web and print design.",
	icon: "Adobe Fonts.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "adobe-fonts:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("use\\.typekit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-fonts:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^\"]+use\\.typekit\\.(?:net|com)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adobe-fonts:dom:2",
			kind: "dom",
			selector: "link[href*='use.typekit.net'], link[href*='use.typekit.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adobe-fonts:jsGlobal:3",
			kind: "jsGlobal",
			property: "Typekit.config.js",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

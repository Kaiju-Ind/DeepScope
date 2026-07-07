import type { TechnologyDefinition } from '../../types';

export const lightningTechnologyDefinition = {
	id: "lightning",
	name: "Lightning",
	website: "https://lightning.vektor-inc.co.jp/en/",
	description: "Lightning is a very simple and easy to customize WordPress theme which is based on the Bootstrap.",
	icon: "Lightning.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "lightning:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/lightning(?:-pro)?\\/.+lightning\\.min\\.js(?:.+ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lightning:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/lightning/'], link[href*='/wp-content/themes/lightning-pro/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lightning:jsGlobal:2",
			kind: "jsGlobal",
			property: "lightningOpt.header_scrool",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const cssigniterOlsenLightTechnologyDefinition = {
	id: "cssigniter-olsen-light",
	name: "CSSIgniter Olsen Light",
	website: "https://www.cssigniter.com/themes/olsen-light",
	description: "CSSIgniter Olsen Light is a clean, minimal, stylish and elegant WordPress blog theme, perfect for lifestyle, food, cooking, fashion, travel, wedding, health & fitness, photography and beauty blogging.",
	icon: "CSSIgniter.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "cssigniter-olsen-light:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/olsen-light\\/.+scripts(?:\\.min)?\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

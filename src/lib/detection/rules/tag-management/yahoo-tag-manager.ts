import type { TechnologyDefinition } from '../../types';

export const yahooTagManagerTechnologyDefinition = {
	id: "yahoo-tag-manager",
	name: "Yahoo! Tag Manager",
	website: "https://tagmanager.yahoo.co.jp/",
	icon: "Yahoo.svg",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "yahoo-tag-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("b\\.yjtag\\.jp\\/iframe"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yahoo-tag-manager:html:1",
			kind: "html",
			pattern: new RegExp("<!-- (?:End )?Yahoo! Tag Manager -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yahoo-tag-manager:html:2",
			kind: "html",
			pattern: new RegExp("<!-- (?:end )?yahoo! tag manager -->"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;

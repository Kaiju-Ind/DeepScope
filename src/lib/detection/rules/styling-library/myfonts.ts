import type { TechnologyDefinition } from '../../types';

export const myfontsTechnologyDefinition = {
	id: "myfonts",
	name: "MyFonts",
	website: "https://www.myfonts.com",
	description: "MyFonts is a digital fonts distributor, based in Woburn, Massachusetts.",
	icon: "MyFonts.svg",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "myfonts:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.myfonts\\.net\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "myfonts:dom:1",
			kind: "dom",
			selector: "link[href*='.myfonts.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "myfonts:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.myfonts\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;

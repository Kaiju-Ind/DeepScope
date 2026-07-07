import type { TechnologyDefinition } from '../../types';

export const adnegahTechnologyDefinition = {
	id: "adnegah",
	name: "Adnegah",
	website: "https://adnegah.net",
	description: "Adnegah is a digital marketing and internet advertising agency.",
	icon: "Adnegah.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adnegah:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adnegah\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adnegah:dom:1",
			kind: "dom",
			selector: "iframe[src*='adnegah.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adnegah:header:2",
			kind: "header",
			key: "X-Advertising-By",
			valuePattern: new RegExp("adnegah\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "adnegah:header:3",
			kind: "header",
			key: "x-advertising-by",
			valuePattern: new RegExp("adnegah\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

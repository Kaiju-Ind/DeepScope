import type { TechnologyDefinition } from '../../types';

export const recurateTechnologyDefinition = {
	id: "recurate",
	name: "Recurate",
	website: "https://www.recurate.com",
	description: "Recurate is a tech-enabled resale service that empowers brands & retailers to establish their own integrated resale platforms directly on their ecommerce sites.",
	icon: "Recurate.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "recurate:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\"(?:vendor|title)?\"\\:\"Recurate\""),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "recurate:dom:1",
			kind: "dom",
			selector: "a[href*='support@recurate.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "recurate:dom:2",
			kind: "dom",
			selector: "link[href*='/recurate-site.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "recurate:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("\"(?:vendor|title)?\"\\:\"recurate\""),
			description: "Script content contains a bounded technology signature.",
		},
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;

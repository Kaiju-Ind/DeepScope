import type { TechnologyDefinition } from '../../types';

export const netteFrameworkTechnologyDefinition = {
	id: "nette-framework",
	name: "Nette Framework",
	website: "https://nette.org",
	icon: "Nette Framework.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "nette-framework:html:0",
			kind: "html",
			pattern: new RegExp("<input[^>]+data-nette-rules"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nette-framework:html:1",
			kind: "html",
			pattern: new RegExp("<div[^>]+id=\"snippet-"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nette-framework:html:2",
			kind: "html",
			pattern: new RegExp("<input[^>]+id=\"frm-"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nette-framework:jsGlobal:3",
			kind: "jsGlobal",
			property: "Nette",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nette-framework:jsGlobal:4",
			kind: "jsGlobal",
			property: "Nette.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nette-framework:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^nette\\-browser$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "nette-framework:header:6",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Nette Framework", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nette-framework:dom:7",
			kind: "dom",
			selector: "input[data-nette-rules], div[id^='snippet-'], input[id^='frm-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nette-framework:header:8",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^nette framework", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const adobeRobohelpTechnologyDefinition = {
	id: "adobe-robohelp",
	name: "Adobe RoboHelp",
	website: "https://adobe.com/products/robohelp.html",
	description: "Adobe RoboHelp is a Help Authoring Tool (HAT) that allows you to create help systems, e-learning content and knowledge bases.",
	icon: "Adobe RoboHelp.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "adobe-robohelp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:wh(?:utils|ver|proxy|lang|topic|msg)|ehlpdhtm)\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-robohelp:jsGlobal:1",
			kind: "jsGlobal",
			property: "gbWhLang",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-robohelp:jsGlobal:2",
			kind: "jsGlobal",
			property: "gbWhMsg",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-robohelp:jsGlobal:3",
			kind: "jsGlobal",
			property: "gbWhProxy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-robohelp:jsGlobal:4",
			kind: "jsGlobal",
			property: "gbWhUtil",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-robohelp:jsGlobal:5",
			kind: "jsGlobal",
			property: "gbWhVer",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-robohelp:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Adobe RoboHelp(?: ([\\d]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "adobe-robohelp:meta:7",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^adobe robohelp(?: ([\\d]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:adobe:robohelp:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

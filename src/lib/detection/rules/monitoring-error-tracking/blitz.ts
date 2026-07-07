import type { TechnologyDefinition } from '../../types';

export const blitzTechnologyDefinition = {
	id: "blitz",
	name: "Blitz",
	website: "https://putyourlightson.com/plugins/blitz",
	description: "Blitz provides intelligent static page caching for creating lightning-fast sites with Craft CMS.",
	icon: "Blitz.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "blitz:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Cached by Blitz on"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "blitz:jsGlobal:1",
			kind: "jsGlobal",
			property: "Blitz",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blitz:jsGlobal:2",
			kind: "jsGlobal",
			property: "blitzReplace",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "blitz:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Blitz$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "blitz:html:4",
			kind: "html",
			pattern: new RegExp("<!-- cached by blitz on"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "blitz:header:5",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^blitz$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
	},
	implies: [
		"craft-cms",
	],
} as const satisfies TechnologyDefinition;

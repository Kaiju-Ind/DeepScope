import type { TechnologyDefinition } from '../../types';

export const jqtouchTechnologyDefinition = {
	id: "jqtouch",
	name: "jQTouch",
	website: "https://jqtouch.com",
	description: "jQTouch is an open-source Zepto/ JQuery plugin with native animations, automatic navigation, and themes for mobile WebKit browsers like iPhone, G1 (Android), and Palm Pre.",
	icon: "jQTouch.png",
	categories: [
		"mobile",
	],
	rules: [
		{
			id: "jqtouch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jqtouch.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jqtouch:jsGlobal:1",
			kind: "jsGlobal",
			property: "jQT",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

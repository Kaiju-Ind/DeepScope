import type { TechnologyDefinition } from '../../types';

export const smartsiteTechnologyDefinition = {
	id: "smartsite",
	name: "SmartSite",
	website: "https://www.seneca.nl/pub/Smartsite/Smartsite-Smartsite-iXperion",
	icon: "SmartSite.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "smartsite:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+\\/smartsite\\.(?:dws|shtml)\\?id="),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "smartsite:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Redacteur SmartInstant", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "smartsite:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("redacteur smartinstant", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

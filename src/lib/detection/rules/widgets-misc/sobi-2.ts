import type { TechnologyDefinition } from '../../types';

export const sobi2TechnologyDefinition = {
	id: "sobi-2",
	name: "SOBI 2",
	website: "https://www.sigsiu.net/sobi2.html",
	description: "SOBI2 is an older version of the SOBI (Simple Open Business Index) directory extension for Joomla. It was used for creating and managing directory listings on Joomla-powered websites, allowing users to list businesses, services, or other types of entries.",
	icon: "SOBI 2.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sobi-2:html:0",
			kind: "html",
			pattern: new RegExp("(?:<!-- start of Sigsiu Online Business Index|<div[^>]* class=\"sobi2)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "sobi-2:jsGlobal:1",
			kind: "jsGlobal",
			property: "sobi2Cats",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sobi-2:html:2",
			kind: "html",
			pattern: new RegExp("(?:<!-- start of sigsiu online business index|<div[^>]* class=\"sobi2)"),
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"joomla",
	],
} as const satisfies TechnologyDefinition;

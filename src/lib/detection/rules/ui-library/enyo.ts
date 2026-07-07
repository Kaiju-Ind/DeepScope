import type { TechnologyDefinition } from '../../types';

export const enyoTechnologyDefinition = {
	id: "enyo",
	name: "Enyo",
	website: "https://enyojs.com",
	description: "Enyo is an open-source JavaScript framework for cross-platform for mobile, desktop, TV and web applications.",
	icon: "Enyo.png",
	categories: [
		"ui-library",
		"mobile",
	],
	rules: [
		{
			id: "enyo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("enyo\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "enyo:jsGlobal:1",
			kind: "jsGlobal",
			property: "enyo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

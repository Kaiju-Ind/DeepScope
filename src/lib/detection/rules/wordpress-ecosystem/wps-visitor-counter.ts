import type { TechnologyDefinition } from '../../types';

export const wpsVisitorCounterTechnologyDefinition = {
	id: "wps-visitor-counter",
	name: "WPS Visitor Counter",
	website: "https://wordpress.org/plugins/wps-visitor-counter/",
	description: "WPS Visitor Counter is a plugin for WordPress that counts the number of visitors to a website.",
	icon: "WPS Visitor Counter.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wps-visitor-counter:jsGlobal:0",
			kind: "jsGlobal",
			property: "wpspagevisit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

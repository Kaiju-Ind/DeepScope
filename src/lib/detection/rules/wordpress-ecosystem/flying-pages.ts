import type { TechnologyDefinition } from '../../types';

export const flyingPagesTechnologyDefinition = {
	id: "flying-pages",
	name: "Flying Pages",
	website: "https://wordpress.org/plugins/flying-pages/",
	description: "Flying Pages is a performance optimisation plugin for WordPress websites designed to reduce page load times and improve the user experience.",
	icon: "Flying Pages.svg",
	categories: [
		"wordpress-ecosystem",
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "flying-pages:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/flying-pages\\/.+\\.js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flying-pages:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/flying-pages/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "flying-pages:jsGlobal:2",
			kind: "jsGlobal",
			property: "flyingPages",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

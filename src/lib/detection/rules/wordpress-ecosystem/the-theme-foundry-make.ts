import type { TechnologyDefinition } from '../../types';

export const theThemeFoundryMakeTechnologyDefinition = {
	id: "the-theme-foundry-make",
	name: "The Theme Foundry Make",
	website: "https://thethemefoundry.com/wordpress-themes/make",
	description: "Make is a free, open-source builder WordPress theme by The Theme Foundry.",
	icon: "The Theme Foundry.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "the-theme-foundry-make:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/make(?:-child)?\\/.+frontend\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "the-theme-foundry-make:jsGlobal:1",
			kind: "jsGlobal",
			property: "MakeDynamicStylesheet",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "the-theme-foundry-make:jsGlobal:2",
			kind: "jsGlobal",
			property: "MakeFrontEnd",
			confidence: 50,
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

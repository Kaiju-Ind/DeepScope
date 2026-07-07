import type { TechnologyDefinition } from '../../types';

export const localfocusTechnologyDefinition = {
	id: "localfocus",
	name: "LocalFocus",
	website: "https://www.localfocus.nl/en/",
	description: "LocalFocus is a data visualization platform that allows users to create interactive maps, charts, and infographics from various data sources.",
	icon: "LocalFocus.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "localfocus:html:0",
			kind: "html",
			pattern: new RegExp("<iframe[^>]+\\blocalfocus\\b"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "localfocus:dom:1",
			kind: "dom",
			selector: "iframe[src*='//localfocus2.appspot.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "localfocus:jsGlobal:2",
			kind: "jsGlobal",
			property: "LFlegacyManipulate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"angular",
		"d3",
	],
} as const satisfies TechnologyDefinition;

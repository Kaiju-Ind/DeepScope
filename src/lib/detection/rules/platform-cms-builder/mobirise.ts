import type { TechnologyDefinition } from '../../types';

export const mobiriseTechnologyDefinition = {
	id: "mobirise",
	name: "Mobirise",
	website: "https://mobirise.com",
	description: "Mobirise is a free offline website builder for Windows and macOS that enables non-coders to create small and medium-sized websites locally using drag-and-drop pre-made blocks and themes.",
	icon: "mobirise.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mobirise:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Site made with Mobirise Website Builder v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mobirise:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Mobirise v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mobirise:dom:2",
			kind: "dom",
			selector: "link[href*='mobirise']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mobirise:html:3",
			kind: "html",
			pattern: new RegExp("<!-- site made with mobirise website builder v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "mobirise:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^mobirise v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;

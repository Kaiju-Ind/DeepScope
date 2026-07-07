import type { TechnologyDefinition } from '../../types';

export const wikkawikiTechnologyDefinition = {
	id: "wikkawiki",
	name: "WikkaWiki",
	website: "https://wikkawiki.org",
	description: "WikkaWiki is an open-source wiki application written in PHP.",
	icon: "WikkaWiki.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "wikkawiki:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"[^>]+WikkaWiki"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wikkawiki:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("WikkaWiki", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "wikkawiki:html:2",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"[^>]+wikkawiki"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "wikkawiki:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("wikkawiki", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:wikkawiki:wikkawiki:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

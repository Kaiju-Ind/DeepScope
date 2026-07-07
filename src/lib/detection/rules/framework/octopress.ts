import type { TechnologyDefinition } from '../../types';

export const octopressTechnologyDefinition = {
	id: "octopress",
	name: "Octopress",
	website: "https://octopress.org",
	description: "Octopress is a static blogging framework.",
	icon: "octopress.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "octopress:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/octopress\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "octopress:html:1",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"http:\\/\\/octopress\\.org\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "octopress:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Octopress", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "octopress:html:3",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"http:\\/\\/octopress\\.org\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "octopress:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("octopress", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"jekyll",
	],
} as const satisfies TechnologyDefinition;

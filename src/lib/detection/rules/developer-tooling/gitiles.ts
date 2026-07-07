import type { TechnologyDefinition } from '../../types';

export const gitilesTechnologyDefinition = {
	id: "gitiles",
	name: "Gitiles",
	website: "https://gerrit.googlesource.com/gitiles/",
	description: "Gitiles is a web interface for browsing Git repositories.",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "gitiles:html:0",
			kind: "html",
			pattern: new RegExp("Powered by <a href=\"https:\\/\\/gerrit\\.googlesource\\.com\\/gitiles\\/\">Gitiles<"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gitiles:html:1",
			kind: "html",
			pattern: new RegExp("powered by <a href=\"https:\\/\\/gerrit\\.googlesource\\.com\\/gitiles\\/\">gitiles<"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gitiles:dom:2",
			kind: "dom",
			selector: ".Footer-poweredBy a[href='https://gerrit.googlesource.com/gitiles/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"git",
		"java",
	],
} as const satisfies TechnologyDefinition;

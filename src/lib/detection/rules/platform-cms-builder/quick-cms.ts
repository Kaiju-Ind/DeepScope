import type { TechnologyDefinition } from '../../types';

export const quickCmsTechnologyDefinition = {
	id: "quick-cms",
	name: "Quick.CMS",
	website: "https://opensolution.org",
	icon: "Quick.CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "quick-cms:html:0",
			kind: "html",
			pattern: new RegExp("<a href=\"[^>]+opensolution\\.org\\/\">CMS by"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "quick-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Quick\\.CMS(?: v([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "quick-cms:html:2",
			kind: "html",
			pattern: new RegExp("<a href=\"[^>]+opensolution\\.org\\/\">cms by"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "quick-cms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("quick\\.cms(?: v([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:opensolution:quick.cms:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const breadcrumbNavxtTechnologyDefinition = {
	id: "breadcrumb-navxt",
	name: "Breadcrumb NavXT",
	website: "https://github.com/mtekk/Breadcrumb-NavXT",
	description: "Breadcrumb NavXT is a WordPress plugin compatible with WordPress versions 4.9 and up.",
	icon: "Breadcrumb NavXT.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "breadcrumb-navxt:html:0",
			kind: "html",
			pattern: new RegExp("<!-- Breadcrumb NavXT ([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "breadcrumb-navxt:html:1",
			kind: "html",
			pattern: new RegExp("<!-- breadcrumb navxt ([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

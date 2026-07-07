import type { TechnologyDefinition } from '../../types';

export const pureCssTechnologyDefinition = {
	id: "pure-css",
	name: "Pure CSS",
	website: "https://purecss.io",
	description: "Pure CSS is a set of small, responsive CSS modules that can be used in web projects.",
	icon: "Pure CSS.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "pure-css:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+(?:([\\d.])+\\/)?pure(?:-min)?\\.css"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pure-css:html:1",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=\"[^\"]*pure-u-(?:sm-|md-|lg-|xl-)?\\d-\\d"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "pure-css:dom:2",
			kind: "dom",
			selector: "link[href*='pure.css'], link[href*='pure-min.css'], div[class*='pure-u-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const slickTechnologyDefinition = {
	id: "slick",
	name: "Slick",
	website: "https://kenwheeler.github.io/slick",
	icon: "Slick.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "slick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/([\\d.]+))?\\/slick(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "slick:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]+(?:\\/([\\d.]+)\\/)?slick-theme\\.css"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "slick:dom:2",
			kind: "dom",
			selector: "link[href*='slick-theme.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;

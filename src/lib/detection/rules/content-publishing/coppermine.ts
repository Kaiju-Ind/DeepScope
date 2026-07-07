import type { TechnologyDefinition } from '../../types';

export const coppermineTechnologyDefinition = {
	id: "coppermine",
	name: "Coppermine",
	website: "https://coppermine-gallery.net",
	description: "Coppermine is an open-source image gallery application.",
	icon: "Coppermine.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "coppermine:html:0",
			kind: "html",
			pattern: new RegExp("<!--Coppermine Photo Gallery ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "coppermine:dom:1",
			kind: "dom",
			selector: "link[href*='/coppermine.css'][rel='stylesheet']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "coppermine:html:2",
			kind: "html",
			pattern: new RegExp("<!--coppermine photo gallery ([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:coppermine-gallery:coppermine_photo_gallery:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;

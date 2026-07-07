import type { TechnologyDefinition } from '../../types';

export const galleryTechnologyDefinition = {
	id: "gallery",
	name: "Gallery",
	website: "https://galleryproject.org/",
	description: "Gallery is an open-source web based photo album organiser.",
	icon: "Gallery.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "gallery:html:0",
			kind: "html",
			pattern: new RegExp("<div id=\"gsNavBar\" class=\"gcBorder1\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gallery:html:1",
			kind: "html",
			pattern: new RegExp("<a href=\"http:\\/\\/gallery\\.sourceforge\\.net\"><img[^>]+Powered by Gallery\\s*(?:(?:v|Version)\\s*([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gallery:jsGlobal:2",
			kind: "jsGlobal",
			property: "$.fn.gallery_valign",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gallery:jsGlobal:3",
			kind: "jsGlobal",
			property: "galleryAuthToken",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gallery:dom:4",
			kind: "dom",
			selector: "div[id*='gsNavBar']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gallery:dom:5",
			kind: "dom",
			selector: "div[class*='gcBorder1']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gallery:html:6",
			kind: "html",
			pattern: new RegExp("<a href=\"http:\\/\\/gallery\\.sourceforge\\.net\"><img[^>]+powered by gallery\\s*(?:(?:v|version)\\s*([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gallery:html:7",
			kind: "html",
			pattern: new RegExp("<div id=\"gsnavbar\" class=\"gcborder1\">"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gallery:dom:8",
			kind: "dom",
			selector: "div[id*='gsNavBar'], div[class*='gcBorder1']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:galleryproject:gallery:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const phpalbumTechnologyDefinition = {
	id: "phpalbum",
	name: "phpAlbum",
	website: "https://phpalbum.net",
	description: "phpAlbum is an open-source PHP script which allows you to create your personal photo album.",
	icon: "phpAlbum.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "phpalbum:html:0",
			kind: "html",
			pattern: new RegExp("<!--phpalbum ([.\\d\\s]+)-->"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phpalbum:phpalbum:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const jalbumTechnologyDefinition = {
	id: "jalbum",
	name: "JAlbum",
	website: "https://jalbum.net/en",
	description: "jAlbum is across-platform photo website software for creating and uploading galleries from images and videos.",
	icon: "JAlbum.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "jalbum:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("JAlbum( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jalbum:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("jalbum( [\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;

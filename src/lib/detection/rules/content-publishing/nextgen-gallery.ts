import type { TechnologyDefinition } from '../../types';

export const nextgenGalleryTechnologyDefinition = {
	id: "nextgen-gallery",
	name: "NextGEN Gallery",
	website: "https://www.imagely.com/wordpress-gallery-plugin",
	description: "NextGEN Gallery is a free open-source image management plugin for the WordPress content management system.",
	icon: "NextGEN Gallery.png",
	categories: [
		"content-publishing",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "nextgen-gallery:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/nextgen-gallery\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nextgen-gallery:html:1",
			kind: "html",
			pattern: new RegExp("<!-- <meta name=\"NextGEN\" version=\"([\\d.]+)\" \\/> -->"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "nextgen-gallery:jsGlobal:2",
			kind: "jsGlobal",
			property: "nextgen_lightbox_settings.static_path",
			valuePattern: new RegExp("\\/wp-content\\/plugins\\/nextgen-gallery\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nextgen-gallery:meta:3",
			kind: "meta",
			key: "NextGEN",
			valuePattern: new RegExp("^([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nextgen-gallery:html:4",
			kind: "html",
			pattern: new RegExp("<!-- <meta name=\"nextgen\" version=\"([\\d.]+)\" \\/> -->"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:imagely:nextgen_gallery:*:*:*:*:*:*:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

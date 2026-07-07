import type { TechnologyDefinition } from '../../types';

export const photoGalleryTechnologyDefinition = {
	id: "photo-gallery",
	name: "Photo Gallery",
	website: "https://10web.io/plugins/wordpress-photo-gallery",
	description: "Photo Gallery plugin is a feature-rich, yet easy-to-use WordPress tool, which lets you add mobile-friendly image galleries and gallery groups to your website by 10Web.",
	icon: "Photo Gallery.svg",
	categories: [
		"wordpress-ecosystem",
		"content-publishing",
	],
	rules: [
		{
			id: "photo-gallery:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/photo-gallery\\/.+scripts\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "photo-gallery:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/photo-gallery/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:10web:photo_gallery:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const responsiveLightboxAndGalleryTechnologyDefinition = {
	id: "responsive-lightbox-and-gallery",
	name: "Responsive Lightbox & Gallery",
	website: "https://dfactory.eu/products/responsive-lightbox-gallery-extensions/",
	description: "Responsive Lightbox & Gallery plugin is a lightweight WordPress gallery plugin by Digital Factory.",
	icon: "Digital Factory.png",
	categories: [
		"wordpress-ecosystem",
		"content-publishing",
	],
	rules: [
		{
			id: "responsive-lightbox-and-gallery:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/responsive-lightbox\\/.+front\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "responsive-lightbox-and-gallery:jsGlobal:1",
			kind: "jsGlobal",
			property: "rlArgs.activeGalleries",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "responsive-lightbox-and-gallery:jsGlobal:2",
			kind: "jsGlobal",
			property: "rl_hide_image",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "responsive-lightbox-and-gallery:jsGlobal:3",
			kind: "jsGlobal",
			property: "rl_view_image",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

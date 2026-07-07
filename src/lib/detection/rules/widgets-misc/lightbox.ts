import type { TechnologyDefinition } from '../../types';

export const lightboxTechnologyDefinition = {
	id: "lightbox",
	name: "Lightbox",
	website: "https://lokeshdhakar.com/projects/lightbox2/",
	description: "Lightbox is small javascript library used to overlay images on top of the current page.",
	icon: "Lightbox.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "lightbox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lightbox(?:-plus-jquery)?.{0,32}\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lightbox:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^\"]+lightbox(?:\\.min)?\\.css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "lightbox:dom:2",
			kind: "dom",
			selector: "link[href*='lightbox']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "lightbox:jsGlobal:3",
			kind: "jsGlobal",
			property: "Lightbox.activeImage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lightbox:jsGlobal:4",
			kind: "jsGlobal",
			property: "lightbox.$lightbox",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:lightbox_photo_gallery_project:lightbox_photo_gallery:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

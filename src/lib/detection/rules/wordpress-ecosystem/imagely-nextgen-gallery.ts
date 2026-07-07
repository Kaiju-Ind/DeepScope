import type { TechnologyDefinition } from '../../types';

export const imagelyNextgenGalleryTechnologyDefinition = {
	id: "imagely-nextgen-gallery",
	name: "Imagely NextGEN Gallery",
	website: "https://www.imagely.com/wordpress-gallery-plugin",
	description: "NextGEN Gallery is a WordPress gallery plugin maintained by Imagely.",
	icon: "Imagely.png",
	categories: [
		"wordpress-ecosystem",
		"content-publishing",
	],
	rules: [
		{
			id: "imagely-nextgen-gallery:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/nextgen-gallery(?:-pro|-plus)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "imagely-nextgen-gallery:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/nextgen-gallery/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

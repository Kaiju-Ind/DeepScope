import type { TechnologyDefinition } from '../../types';

export const photoshelterTechnologyDefinition = {
	id: "photoshelter",
	name: "PhotoShelter",
	website: "https://www.photoshelter.com",
	description: "PhotoShelter is a cloud storage service that doubles as a website and ecommerce platform for photographers.",
	icon: "PhotoShelter.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "photoshelter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.psecn\\.photoshelter\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "photoshelter:url:1",
			kind: "url",
			pattern: new RegExp("photoshelter\\.com"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "photoshelter:dom:2",
			kind: "dom",
			selector: "link[href*='.c.photoshelter.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"jquery",
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;

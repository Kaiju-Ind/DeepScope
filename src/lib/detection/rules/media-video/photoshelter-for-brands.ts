import type { TechnologyDefinition } from '../../types';

export const photoshelterForBrandsTechnologyDefinition = {
	id: "photoshelter-for-brands",
	name: "PhotoShelter for Brands",
	website: "https://brands.photoshelter.com",
	description: "PhotoShelter for Brands is a cloud-based media management system for companies and organizations.",
	icon: "PhotoShelter.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "photoshelter-for-brands:dom:0",
			kind: "dom",
			selector: "a[href*='.photoshelter.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "photoshelter-for-brands:dom:1",
			kind: "dom",
			selector: "a[href*='brands.photoshelter.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	excludes: [
		"photoshelter",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const theasysTechnologyDefinition = {
	id: "theasys",
	name: "Theasys",
	website: "https://www.theasys.io",
	description: "Theasys is a platform for creating, uploading, and embedding 360° VR panoramic images and virtual tours online.",
	icon: "Theasys.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "theasys:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.theasys\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "theasys:jsGlobal:1",
			kind: "jsGlobal",
			property: "theasys.api",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
		],
	},
} as const satisfies TechnologyDefinition;

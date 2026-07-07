import type { TechnologyDefinition } from '../../types';

export const myFlyingBoxTechnologyDefinition = {
	id: "my-flying-box",
	name: "My Flying Box",
	website: "https://www.myflyingbox.com/",
	description: "My Flying Box is an international parcel shipping company.",
	icon: "My Flying Box.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "my-flying-box:text:0",
			kind: "text",
			pattern: new RegExp("\\bMy Flying Box\\b"),
			description: "Page text contains a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

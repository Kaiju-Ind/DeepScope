import type { TechnologyDefinition } from '../../types';

export const parcelTechnologyDefinition = {
	id: "parcel",
	name: "parcel",
	website: "https://parceljs.org/",
	description: "Parcel is an open-source web application bundler known for its zero-config approach, simplifying the process of building and bundling web projects.",
	icon: "Parcel.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "parcel:jsGlobal:0",
			kind: "jsGlobal",
			property: "parcelRequire",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:parceljs:parcel:*:*:*:*:*:*:*:*",
	},
	implies: [
		"swc",
	],
} as const satisfies TechnologyDefinition;

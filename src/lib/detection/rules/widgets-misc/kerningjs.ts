import type { TechnologyDefinition } from '../../types';

export const kerningjsTechnologyDefinition = {
	id: "kerningjs",
	name: "KerningJS",
	website: "https://webupon.com/blog/what-is-kerning",
	description: "Kerning.js is a JavaScript library that applies real CSS rules to style, transform, and scale web typography.",
	icon: "Kerning.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "kerningjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.FLAutoKerning\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kerningjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "FLAutoKerning",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kerningjs:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("jquery\\.flautokerning\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

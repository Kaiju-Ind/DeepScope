import type { TechnologyDefinition } from '../../types';

export const farfetchBlackAndWhiteTechnologyDefinition = {
	id: "farfetch-black-and-white",
	name: "FARFETCH Black & White",
	website: "https://www.farfetchplatformsolutions.com/",
	description: "Farfetch Platform Solutions is a full service platform and agency providing end-to-end, multichannel e-commerce solutions for luxury fashion brands under the name Farfetch Black & White.",
	icon: "Farfetch.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "farfetch-black-and-white:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn-static\\.farfetch-contents.com\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

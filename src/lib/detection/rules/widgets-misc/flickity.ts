import type { TechnologyDefinition } from '../../types';

export const flickityTechnologyDefinition = {
	id: "flickity",
	name: "Flickity",
	website: "https://flickity.metafizzy.co",
	description: "Flickity is a JavaScript slider library, built by David DeSandro of Metafizzy fame.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "flickity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("flickity(?:\\/|@)([\\d\\.]+).+flickity(?:\\.pkgd)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flickity:dom:1",
			kind: "dom",
			selector: "style[data-context='foundation-flickity-css'], div.flickity-enabled",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "flickity:jsGlobal:2",
			kind: "jsGlobal",
			property: "Flickity",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

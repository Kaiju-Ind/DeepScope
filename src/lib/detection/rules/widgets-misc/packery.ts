import type { TechnologyDefinition } from '../../types';

export const packeryTechnologyDefinition = {
	id: "packery",
	name: "Packery",
	website: "https://packery.metafizzy.co",
	description: "Packery is a JavaScript library and jQuery plugin that makes gapless and draggable layouts.",
	icon: "Packery.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "packery:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("packery(?:\\.pkgd)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "packery:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/packery-mode\\.pkgd\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;

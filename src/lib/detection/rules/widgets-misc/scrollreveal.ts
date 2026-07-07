import type { TechnologyDefinition } from '../../types';

export const scrollrevealTechnologyDefinition = {
	id: "scrollreveal",
	name: "scrollreveal",
	website: "https://scrollrevealjs.org",
	description: "Reveal elements as they enter the viewport.",
	icon: "scrollreveal.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "scrollreveal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scrollreveal(?:\\.min)(?:\\.js)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "scrollreveal:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]+data-sr(?:-id)"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "scrollreveal:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("scrollreveal(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "scrollreveal:jsGlobal:3",
			kind: "jsGlobal",
			property: "ScrollReveal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const anythingsliderTechnologyDefinition = {
	id: "anythingslider",
	name: "AnythingSlider",
	website: "https://css-tricks.com/anythingslider-jquery-plugin/",
	description: "A robust jQuery-based slider plugin.",
	icon: "AnythingSlider.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "anythingslider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("anythingslider(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

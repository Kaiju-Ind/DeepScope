import type { TechnologyDefinition } from '../../types';

export const bxsliderTechnologyDefinition = {
	id: "bxslider",
	name: "bxSlider",
	website: "https://bxslider.com/",
	description: "Add a respsonsive image slider to any website.",
	icon: "bxSlider.png",
	categories: [
		"content-publishing",
		"widgets-misc",
	],
	rules: [
		{
			id: "bxslider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("bxslider(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;

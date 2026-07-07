import type { TechnologyDefinition } from '../../types';

export const swiffySliderTechnologyDefinition = {
	id: "swiffy-slider",
	name: "Swiffy Slider",
	website: "https://swiffyslider.com",
	description: "Swiffy Slider is a wrapper defined in html with slides, navigation and indicators as its children.",
	icon: "Swiffy Slider.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "swiffy-slider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/npm\\/swiffy-slider@([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swiffy-slider:dom:1",
			kind: "dom",
			selector: "link[href*='/swiffy-slider.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

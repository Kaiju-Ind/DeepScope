import type { TechnologyDefinition } from '../../types';

export const orbitSliderTechnologyDefinition = {
	id: "orbit-slider",
	name: "Orbit Slider",
	website: "https://zurb.com/playground/orbit-jquery-image-slider",
	description: "Orbit is a jQuery slider.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "orbit-slider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("orbit(?:\\.min)?([\\d.]{2,}[\\d])?\\.js"),
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

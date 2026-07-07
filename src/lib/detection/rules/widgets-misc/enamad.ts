import type { TechnologyDefinition } from '../../types';

export const enamadTechnologyDefinition = {
	id: "enamad",
	name: "eNamad",
	website: "https://enamad.ir/",
	description: "eNamad is an electronic trust symbol.",
	icon: "eNamad.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "enamad:dom:0",
			kind: "dom",
			selector: "a[href*='.enamad.ir/'][target='_blank'], div.e-namad-widget-wrapper, img[src*='.enamad.ir/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "enamad:meta:1",
			kind: "meta",
			key: "enamad",
			valuePattern: new RegExp("^\\d+$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

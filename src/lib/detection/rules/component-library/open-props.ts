import type { TechnologyDefinition } from '../../types';

export const openPropsTechnologyDefinition = {
	id: "open-props",
	name: "Open-Props",
	website: "https://open-props.style",
	description: "Open-Props is a collection of CSS custom properties to help accelerate adaptive and consistent design.",
	icon: "Open-Props.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "open-props:dom:0",
			kind: "dom",
			selector: "link[href*='unpkg.com/open-props'][rel='stylesheet']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

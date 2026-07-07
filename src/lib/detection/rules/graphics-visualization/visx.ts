import type { TechnologyDefinition } from '../../types';

export const visxTechnologyDefinition = {
	id: "visx",
	name: "Visx",
	website: "https://airbnb.io/visx/",
	description: "Visx is a collection of React-based data visualisation tools developed by Airbnb.",
	icon: "Visx.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "visx:dom:0",
			kind: "dom",
			selector: "g.visx-group,g.vx-group",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"react",
	],
} as const satisfies TechnologyDefinition;

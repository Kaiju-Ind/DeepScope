import type { TechnologyDefinition } from '../../types';

export const rechartsTechnologyDefinition = {
	id: "recharts",
	name: "Recharts",
	website: "https://recharts.org/",
	description: "Recharts is a component-based charting library, which is exclusively built for React applications.",
	icon: "Recharts.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "recharts:dom:0",
			kind: "dom",
			selector: "div > div > svg.recharts-surface",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"react",
	],
} as const satisfies TechnologyDefinition;

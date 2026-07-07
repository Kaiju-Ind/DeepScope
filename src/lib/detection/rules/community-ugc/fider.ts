import type { TechnologyDefinition } from '../../types';

export const fiderTechnologyDefinition = {
	id: "fider",
	name: "Fider",
	website: "https://fider.io",
	description: "Fider is an open-source platform for collecting, organizing, and prioritizing customer feedback to support product development decisions.",
	icon: "Fider.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "fider:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunkfider",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

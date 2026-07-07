import type { TechnologyDefinition } from '../../types';

export const tachyonsTechnologyDefinition = {
	id: "tachyons",
	name: "Tachyons",
	website: "https://tachyons.io",
	description: "Tachyons is a functional CSS framework.",
	icon: "Tachyons.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "tachyons:dom:0",
			kind: "dom",
			selector: "link[href*='tachyons.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tachyons:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunkgatsby_starter_blog_tachyons",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

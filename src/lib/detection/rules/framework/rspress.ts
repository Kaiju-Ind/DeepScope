import type { TechnologyDefinition } from '../../types';

export const rspressTechnologyDefinition = {
	id: "rspress",
	name: "Rspress",
	website: "https://rspress.dev",
	description: "Rspress is a static site generator built on Rspack, offering features like MDX support, full-text search, internationalization, and customizable themes​.",
	icon: "Rspress.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "rspress:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Rspress\\sv([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rspress:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("rspress\\sv([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"rspack",
	],
} as const satisfies TechnologyDefinition;

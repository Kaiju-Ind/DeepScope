import type { TechnologyDefinition } from '../../types';

export const bladeTechnologyDefinition = {
	id: "blade",
	name: "Blade",
	website: "https://lets-blade.com",
	icon: "Blade.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "blade:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("blade-([\\w.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "blade:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("blade-([\\w.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;

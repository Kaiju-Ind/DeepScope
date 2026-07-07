import type { TechnologyDefinition } from '../../types';

export const statsigTechnologyDefinition = {
	id: "statsig",
	name: "Statsig",
	website: "https://statsig.com/",
	description: "Statsig is a modern product experimentation platform that helps product teams continuously measure impact of every single feature they launch.",
	icon: "Statsig.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "statsig:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.statsigapi\\.net"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "statsig:jsGlobal:1",
			kind: "jsGlobal",
			property: "statsig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statsig:jsGlobal:2",
			kind: "jsGlobal",
			property: "statsigInitialized",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statsig:jsGlobal:3",
			kind: "jsGlobal",
			property: "statsigWWW",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statsig:jsGlobal:4",
			kind: "jsGlobal",
			property: "__STATSIG__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "statsig:jsGlobal:5",
			kind: "jsGlobal",
			property: "__STATSIG__.SDK_VERSION",
			valuePattern: new RegExp("([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const snapTechnologyDefinition = {
	id: "snap",
	name: "Snap",
	website: "https://snapframework.com",
	icon: "Snap.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "snap:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Snap\\/([.\\d]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "snap:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("snap\\/([.\\d]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"haskell",
	],
} as const satisfies TechnologyDefinition;

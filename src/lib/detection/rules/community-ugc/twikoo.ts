import type { TechnologyDefinition } from '../../types';

export const twikooTechnologyDefinition = {
	id: "twikoo",
	name: "Twikoo",
	website: "https://twikoo.js.org",
	description: "Twikoo is a simple, safe, free comment system.",
	icon: "Twikoo.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "twikoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/twikoo\\/dist\\/twikoo\\.all\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "twikoo:jsGlobal:1",
			kind: "jsGlobal",
			property: "twikoo.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const scriptAculoUsTechnologyDefinition = {
	id: "script-aculo-us",
	name: "script.aculo.us",
	website: "https://script.aculo.us",
	icon: "script.aculo.us.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "script-aculo-us:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(?:scriptaculous|protoaculous)(?:\\.js|\\/)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "script-aculo-us:jsGlobal:1",
			kind: "jsGlobal",
			property: "Scriptaculous.Version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:script.aculo.us:script.aculo.us:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

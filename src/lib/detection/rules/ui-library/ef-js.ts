import type { TechnologyDefinition } from '../../types';

export const efJsTechnologyDefinition = {
	id: "ef-js",
	name: "ef.js",
	website: "https://ef.js.org",
	icon: "ef.js.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "ef-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ef(?:-core)?(?:\\.min|\\.dev)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ef-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "ef.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ef-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "efCore",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

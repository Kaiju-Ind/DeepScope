import type { TechnologyDefinition } from '../../types';

export const javascriptInfovisToolkitTechnologyDefinition = {
	id: "javascript-infovis-toolkit",
	name: "JavaScript Infovis Toolkit",
	website: "https://philogb.github.io/jit/",
	icon: "JavaScript Infovis Toolkit.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "javascript-infovis-toolkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jit(?:-yc)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "javascript-infovis-toolkit:jsGlobal:1",
			kind: "jsGlobal",
			property: "$jit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "javascript-infovis-toolkit:jsGlobal:2",
			kind: "jsGlobal",
			property: "$jit.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

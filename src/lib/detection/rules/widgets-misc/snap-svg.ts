import type { TechnologyDefinition } from '../../types';

export const snapSvgTechnologyDefinition = {
	id: "snap-svg",
	name: "Snap.svg",
	website: "https://snapsvg.io",
	icon: "Snap.svg.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "snap-svg:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("snap\\.svg(?:-min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snap-svg:jsGlobal:1",
			kind: "jsGlobal",
			property: "Snap.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

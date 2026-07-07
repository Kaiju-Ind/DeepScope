import type { TechnologyDefinition } from '../../types';

export const kineticjsTechnologyDefinition = {
	id: "kineticjs",
	name: "KineticJS",
	website: "https://github.com/ericdrowell/KineticJS/",
	icon: "KineticJS.png",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "kineticjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("kinetic(?:-v?([\\d.]+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kineticjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kinetic",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kineticjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "Kinetic.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

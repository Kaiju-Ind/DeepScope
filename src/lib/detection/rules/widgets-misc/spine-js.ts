import type { TechnologyDefinition } from '../../types';

export const spineJsTechnologyDefinition = {
	id: "spine-js",
	name: "Spine.js",
	website: "https://spine.github.io",
	description: "Spine is a lightweight MVC library for building JavaScript web applications.",
	icon: "SpineJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "spine-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "Spine",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spine-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Spine.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spine-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "pixi_spine.Spine",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

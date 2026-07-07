import type { TechnologyDefinition } from '../../types';

export const zoneJsTechnologyDefinition = {
	id: "zone-js",
	name: "Zone.js",
	website: "https://github.com/angular/angular/tree/master/packages/zone.js",
	icon: "Angular.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "zone-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "Zone.root",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"angular",
	],
} as const satisfies TechnologyDefinition;

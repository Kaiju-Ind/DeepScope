import type { TechnologyDefinition } from '../../types';

export const solidjsTechnologyDefinition = {
	id: "solidjs",
	name: "SolidJS",
	website: "https://www.solidjs.com/",
	description: "SolidJS is a purely reactive library. It was designed from the ground up with a reactive core. It's influenced by reactive principles developed by previous libraries.",
	icon: "SolidJS.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "solidjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "Solid$$",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solidjs:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.solidjs\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "solidjs:dom:2",
			kind: "dom",
			selector: "[data-hk]",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	excludes: [
		"react",
	],
} as const satisfies TechnologyDefinition;

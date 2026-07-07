import type { TechnologyDefinition } from '../../types';

export const popperTechnologyDefinition = {
	id: "popper",
	name: "Popper",
	website: "https://popper.js.org",
	description: "Popper is a positioning engine, its purpose is to calculate the position of an element to make it possible to position it near a given reference element.",
	icon: "Popper.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "popper:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/popper(?:\\.min)?\\.js(?:\\/([0-9.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "popper:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("popperjs(?:\\/|-)core(?:@|-)([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "popper:jsGlobal:2",
			kind: "jsGlobal",
			property: "Popper.Defaults",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "popper:jsGlobal:3",
			kind: "jsGlobal",
			property: "Popper.applyStyles",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "popper:jsGlobal:4",
			kind: "jsGlobal",
			property: "createPopper",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

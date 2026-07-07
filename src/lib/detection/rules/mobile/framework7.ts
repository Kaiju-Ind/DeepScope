import type { TechnologyDefinition } from '../../types';

export const framework7TechnologyDefinition = {
	id: "framework7",
	name: "Framework7",
	website: "https://framework7.io",
	description: "Framework7 is a mobile HTML framework designed for creating iOS and Android applications with a native-like user experience.",
	icon: "Framework7.svg",
	categories: [
		"mobile",
		"widgets-misc",
		"component-library",
	],
	rules: [
		{
			id: "framework7:jsGlobal:0",
			kind: "jsGlobal",
			property: "Framework7.Component",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "framework7:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/(?:js\\/)?)?framework7(?:-((?:\\d+\\.)+\\d+))?(?:\\.custom)?(?:\\.min)?(?:-vue)?_?[\\w\\.]{0,29}\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "framework7:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:js\\/)?)?framework7(?:-)?(?:\\.custom)?(?:\\.min)?(?:-vue)?_?[\\w\\.]{0,29}\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "framework7:dom:3",
			kind: "dom",
			selector: "link[href*='framework7'], .framework7-root, .framework7-modals",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

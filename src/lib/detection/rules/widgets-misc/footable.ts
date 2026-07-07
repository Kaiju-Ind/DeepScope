import type { TechnologyDefinition } from '../../types';

export const footableTechnologyDefinition = {
	id: "footable",
	name: "FooTable",
	website: "https://fooplugins.github.io/FooTable/index.html",
	description: "FooTable is a jQuery plugin that converts HTML tables into expandable responsive tables.",
	icon: "FooPlugins.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "footable:jsGlobal:0",
			kind: "jsGlobal",
			property: "$FOOTABLE.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "footable:jsGlobal:1",
			kind: "jsGlobal",
			property: "footable.plugins",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;

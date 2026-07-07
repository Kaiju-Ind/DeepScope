import type { TechnologyDefinition } from '../../types';

export const choicesTechnologyDefinition = {
	id: "choices",
	name: "Choices",
	website: "https://github.com/Choices-js/Choices",
	description: "Choices.js is a lightweight, configurable select box/text input plugin.",
	icon: "Choices.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "choices:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("choices\\.js(?:@|\\/)?([\\d\\.]+)?.+choices\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "choices:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/modules\\/choices\\/js\\/choices\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "choices:jsGlobal:2",
			kind: "jsGlobal",
			property: "Choices",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

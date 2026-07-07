import type { TechnologyDefinition } from '../../types';

export const langifyTechnologyDefinition = {
	id: "langify",
	name: "langify",
	website: "https://langify-app.com",
	description: "langify translate your shop into multiple languages. langify comes with a visual configurator that allows you to add language switchers that integrate seamlessly into your existing design.",
	icon: "langify.png",
	categories: [
		"translations",
	],
	rules: [
		{
			id: "langify:jsGlobal:0",
			kind: "jsGlobal",
			property: "Langify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "langify:jsGlobal:1",
			kind: "jsGlobal",
			property: "langify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "langify:jsGlobal:2",
			kind: "jsGlobal",
			property: "langify.settings.switcher.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

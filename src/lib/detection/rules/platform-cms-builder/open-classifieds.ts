import type { TechnologyDefinition } from '../../types';

export const openClassifiedsTechnologyDefinition = {
	id: "open-classifieds",
	name: "Open Classifieds",
	website: "https://open-classifieds.com",
	icon: "Open Classifieds.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "open-classifieds:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("open-classifieds\\.com", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "open-classifieds:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("Open Classifieds ?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "open-classifieds:meta:2",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("open classifieds ?([0-9.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:open-classifieds:open_classifieds:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const openelementTechnologyDefinition = {
	id: "openelement",
	name: "OpenElement",
	website: "https://openelement.uk",
	description: "OpenElement is a free website building application with a WYSIWYG interface.",
	icon: "OpenElement.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "openelement:jsGlobal:0",
			kind: "jsGlobal",
			property: "OE.GETools",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "openelement:jsGlobal:1",
			kind: "jsGlobal",
			property: "OEConfWEMenu",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "openelement:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("openElement\\s\\(([\\d\\.]+)\\)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "openelement:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("openelement\\s\\(([\\d\\.]+)\\)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;

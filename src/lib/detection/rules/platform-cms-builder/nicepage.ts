import type { TechnologyDefinition } from '../../types';

export const nicepageTechnologyDefinition = {
	id: "nicepage",
	name: "Nicepage",
	website: "https://nicepage.com",
	description: "Nicepage is a free website building tool that requires no coding skills and integrates seamlessly with all leading CMS systems.",
	icon: "Nicepage.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nicepage:dom:0",
			kind: "dom",
			selector: "link[href*='nicepage.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nicepage:jsGlobal:1",
			kind: "jsGlobal",
			property: "_npAccordionInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nicepage:jsGlobal:2",
			kind: "jsGlobal",
			property: "_npDialogsInit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nicepage:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Nicepage\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nicepage:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("nicepage\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;

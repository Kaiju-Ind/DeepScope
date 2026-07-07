import type { TechnologyDefinition } from '../../types';

export const freetextboxTechnologyDefinition = {
	id: "freetextbox",
	name: "FreeTextBox",
	website: "https://freetextbox.com",
	description: "FreeTextBox is a free open-source HTML Editor.",
	icon: "FreeTextBox.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "freetextbox:html:0",
			kind: "html",
			pattern: new RegExp("<!-- \\* FreeTextBox v\\d \\((\\d+\\.\\d+\\.\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "freetextbox:jsGlobal:1",
			kind: "jsGlobal",
			property: "FTB_API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freetextbox:jsGlobal:2",
			kind: "jsGlobal",
			property: "FTB_AddEvent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "freetextbox:html:3",
			kind: "html",
			pattern: new RegExp("<!-- \\* freetextbox v\\d \\((\\d+\\.\\d+\\.\\d+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:freetextbox:freetextbox:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;

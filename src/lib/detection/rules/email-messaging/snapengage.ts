import type { TechnologyDefinition } from '../../types';

export const snapengageTechnologyDefinition = {
	id: "snapengage",
	name: "SnapEngage",
	website: "https://snapengage.com/",
	description: "SnapEngage is a live chat solution that caters to businesses across various industries.",
	icon: "SnapEngage.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "snapengage:html:0",
			kind: "html",
			pattern: new RegExp("<!-- begin SnapEngage"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "snapengage:jsGlobal:1",
			kind: "jsGlobal",
			property: "SnapEngage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snapengage:jsGlobal:2",
			kind: "jsGlobal",
			property: "SnapEngageChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snapengage:jsGlobal:3",
			kind: "jsGlobal",
			property: "snapengage_mobile",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snapengage:html:4",
			kind: "html",
			pattern: new RegExp("<!-- begin snapengage"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

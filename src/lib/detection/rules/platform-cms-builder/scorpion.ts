import type { TechnologyDefinition } from '../../types';

export const scorpionTechnologyDefinition = {
	id: "scorpion",
	name: "Scorpion",
	website: "https://www.scorpion.co/",
	description: "Scorpion is a marketing and technology provider.",
	icon: "Scorpion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "scorpion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn.cxc.scorpion.direct"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "scorpion:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]+id=\"HSScorpion"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "scorpion:jsGlobal:2",
			kind: "jsGlobal",
			property: "Process.UserData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "scorpion:html:3",
			kind: "html",
			pattern: new RegExp("<[^>]+id=\"hsscorpion"),
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;

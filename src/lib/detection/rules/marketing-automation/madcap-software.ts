import type { TechnologyDefinition } from '../../types';

export const madcapSoftwareTechnologyDefinition = {
	id: "madcap-software",
	name: "MadCap Software",
	website: "https://www.madcapsoftware.com",
	description: "MadCap Software is a company that specialises in creating software tools for technical writers to author and publish various types of content, including user manuals, online help systems, and knowledge bases.",
	icon: "MadCap Software.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "madcap-software:jsGlobal:0",
			kind: "jsGlobal",
			property: "MadCap.Accessibility",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "madcap-software:jsGlobal:1",
			kind: "jsGlobal",
			property: "MadCap.DEBUG",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

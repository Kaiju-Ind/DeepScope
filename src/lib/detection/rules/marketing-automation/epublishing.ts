import type { TechnologyDefinition } from '../../types';

export const epublishingTechnologyDefinition = {
	id: "epublishing",
	name: "ePublishing",
	website: "https://www.epublishing.com",
	description: "ePublishing is a media tech stack that enhances revenue, productivity, and engagement through AI-powered solutions, SEO dominance, and audience integration.",
	icon: "ePublishing.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "epublishing:jsGlobal:0",
			kind: "jsGlobal",
			property: "Ellington.Admin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "epublishing:jsGlobal:1",
			kind: "jsGlobal",
			property: "EllingtonMap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "epublishing:jsGlobal:2",
			kind: "jsGlobal",
			property: "EllingtonPlateLoader.cache",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

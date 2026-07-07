import type { TechnologyDefinition } from '../../types';

export const arcXpTechnologyDefinition = {
	id: "arc-xp",
	name: "Arc XP",
	website: "https://www.arcxp.com",
	description: "Arc XP is a cloud-based digital experience platform that helps enterprise companies, retail brands and media and entertainment organization create and distribute content, drive digital commerce, and deliver powerful experiences.",
	icon: "Arc XP.svg",
	categories: [
		"platform-cms-builder",
		"media-video",
	],
	rules: [
		{
			id: "arc-xp:dom:0",
			kind: "dom",
			selector: "#pb-root",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "arc-xp:jsGlobal:1",
			kind: "jsGlobal",
			property: "Fusion.arcSite",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

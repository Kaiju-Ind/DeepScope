import type { TechnologyDefinition } from '../../types';

export const indiTechnologyDefinition = {
	id: "indi",
	name: "Indi",
	website: "https://indi.com",
	description: "Indi is a video social network where everyone - artists, brands, retailers, nonprofits, celebrities and individuals - can connect with fans and supporters to interact directly with your brand utilising exclusive Video Challenges and Video Threads tailor made by you.",
	icon: "Indi.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "indi:jsGlobal:0",
			kind: "jsGlobal",
			property: "indi.formatStats",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "indi:jsGlobal:1",
			kind: "jsGlobal",
			property: "indiCountly.check_any_consent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "indi:jsGlobal:2",
			kind: "jsGlobal",
			property: "indi_carousel.productCta",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

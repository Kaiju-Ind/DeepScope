import type { TechnologyDefinition } from '../../types';

export const motionPageTechnologyDefinition = {
	id: "motion-page",
	name: "Motion.page",
	website: "https://motion.page",
	description: "Motion.page is a WordPress animation plugin utilizing GSAP and ScrollTrigger.",
	icon: "Motion.Page.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "motion-page:jsGlobal:0",
			kind: "jsGlobal",
			property: "MOTIONPAGE_FRONT.version",
			valuePattern: new RegExp("^([0-9\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

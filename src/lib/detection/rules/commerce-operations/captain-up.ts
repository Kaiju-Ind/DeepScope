import type { TechnologyDefinition } from '../../types';

export const captainUpTechnologyDefinition = {
	id: "captain-up",
	name: "Captain Up",
	website: "https://captainup.com",
	description: "Captain Up is a service that enhances user engagement and retention by utilising gamification, social, and communication tools to maximise user engagement and lifetime value.",
	icon: "CaptainUp.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "captain-up:jsGlobal:0",
			kind: "jsGlobal",
			property: "captain",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

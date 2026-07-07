import type { TechnologyDefinition } from '../../types';

export const spatieSupportBubbleTechnologyDefinition = {
	id: "spatie-support-bubble",
	name: "Spatie Support Bubble",
	website: "https://github.com/spatie/laravel-support-bubble",
	description: "Spatie Support Bubble is a non-intrusive support form.",
	icon: "Spatie.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "spatie-support-bubble:dom:0",
			kind: "dom",
			selector: "div.spatie-support-bubble",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"laravel",
		"tailwind-css",
	],
} as const satisfies TechnologyDefinition;

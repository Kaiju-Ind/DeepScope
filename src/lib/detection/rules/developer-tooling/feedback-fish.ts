import type { TechnologyDefinition } from '../../types';

export const feedbackFishTechnologyDefinition = {
	id: "feedback-fish",
	name: "Feedback Fish",
	website: "https://feedback.fish",
	description: "Feedback Fish is a widget for collecting website feedback from users.",
	icon: "feedback-fish.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "feedback-fish:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https:\\/\\/feedback\\.fish\\/ff\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

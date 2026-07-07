import type { TechnologyDefinition } from '../../types';

export const octipulseTechnologyDefinition = {
	id: "octipulse",
	name: "Octipulse",
	website: "https://www.octipulse.com",
	description: "Octipulse is a platform that helps businesses manage and publish tailored content across digital platforms, enabling them to create a personalised cross-channel experience.",
	icon: "Octipulse.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "octipulse:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^OCTIPULSE$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "octipulse:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^octipulse$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

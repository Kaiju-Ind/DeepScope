import type { TechnologyDefinition } from '../../types';

export const ezPlatformTechnologyDefinition = {
	id: "ez-platform",
	name: "eZ Platform",
	website: "https://ezplatform.com/",
	icon: "eZ.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ez-platform:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("eZ Platform", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"symfony",
	],
} as const satisfies TechnologyDefinition;

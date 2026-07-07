import type { TechnologyDefinition } from '../../types';

export const robixcmGeneratorTechnologyDefinition = {
	id: "robixcm-generator",
	name: "RobixCM Generator",
	website: "https://robixcm.ir",
	description: "RobixCM Generator is a service specializing in designing, developing, updating, and managing websites and online services.",
	icon: "Robixcm.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "robixcm-generator:meta:0",
			kind: "meta",
			key: "robixcm",
			valuePattern: new RegExp("RobixCM", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "robixcm-generator:meta:1",
			kind: "meta",
			key: "robixcm",
			valuePattern: new RegExp("robixcm", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const controlTechnologyDefinition = {
	id: "control",
	name: "Control",
	website: "https://cntrl.site",
	description: "Control is a freehand website builder that allows users to create beautiful fully-custom responsive sites.",
	icon: "Control.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "control:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cntrl\\.site", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

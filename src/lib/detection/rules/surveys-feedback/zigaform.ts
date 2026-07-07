import type { TechnologyDefinition } from '../../types';

export const zigaformTechnologyDefinition = {
	id: "zigaform",
	name: "Zigaform",
	website: "https://zigaform.com",
	description: "Zigaform is a custom form building service that enables the creation and management of online forms for data collection, user input, and workflow automation across websites and applications.",
	icon: "Zigaform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "zigaform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/zigaform-wp-estimator\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

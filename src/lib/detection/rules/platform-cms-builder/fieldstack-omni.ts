import type { TechnologyDefinition } from '../../types';

export const fieldstackOmniTechnologyDefinition = {
	id: "fieldstack-omni",
	name: "FieldStack Omni",
	website: "https://www.fieldstack.com/platform/omnichannel-ecommerce-software",
	description: "Fieldstack Omni is a unified commerce platform that supports web store, third-party channel, and click-to-brick sales in a single system.",
	icon: "FieldStack.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fieldstack-omni:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Fieldstack Omni$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "fieldstack-omni:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^fieldstack omni$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

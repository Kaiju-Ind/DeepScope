import type { TechnologyDefinition } from '../../types';

export const klaviyoFormsTechnologyDefinition = {
	id: "klaviyo-forms",
	name: "Klaviyo Forms",
	website: "https://www.klaviyo.com/features/web-forms",
	description: "Klaviyo Forms are used to capture Email and SMS sign-ups",
	icon: "Klaviyo.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "klaviyo-forms:dom:0",
			kind: "dom",
			selector: "div.klaviyo-form",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

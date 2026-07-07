import type { TechnologyDefinition } from '../../types';

export const conditionalFieldsForContactForm7TechnologyDefinition = {
	id: "conditional-fields-for-contact-form-7",
	name: "Conditional Fields for Contact Form 7",
	website: "https://wordpress.org/plugins/cf7-conditional-fields",
	description: "Adds conditional logic to Contact Form 7.",
	icon: "Conditional Fields for Contact Form 7.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "conditional-fields-for-contact-form-7:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cf7-conditional-fields(?:\\/js)?(?:\\/scripts)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "conditional-fields-for-contact-form-7:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/cf7-conditional-fields/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"contact-form-7",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

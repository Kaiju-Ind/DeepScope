import type { TechnologyDefinition } from '../../types';

export const registrationmagicTechnologyDefinition = {
	id: "registrationmagic",
	name: "RegistrationMagic",
	website: "https://registrationmagic.com",
	description: "RegistrationMagic is a WordPress plugin that enables the creation and management of customized user registration forms and associated submission workflows.",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "registrationmagic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/custom-registration-form-builder-with-submission-manager\\/public\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:metagauss:registrationmagic:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const doctorComTechnologyDefinition = {
	id: "doctor-com",
	name: "Doctor.com",
	website: "https://www.doctor.com",
	description: "Doctor.com is a marketing automation and reputation management platform for doctors.",
	icon: "Doctor.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "doctor-com:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.doctor\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "doctor-com:dom:1",
			kind: "dom",
			selector: "iframe[src*='.doctor.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

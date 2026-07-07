import type { TechnologyDefinition } from '../../types';

export const complyautoTechnologyDefinition = {
	id: "complyauto",
	name: "ComplyAuto",
	website: "https://complyauto.com",
	description: "ComplyAuto is a dealership compliance automation platform that helps automotive businesses manage regulatory requirements, track documentation, and maintain adherence to industry standards through automated processes.",
	icon: "ComplyAuto.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "complyauto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.complyauto\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

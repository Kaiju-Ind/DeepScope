import type { TechnologyDefinition } from '../../types';

export const clinicSitesTechnologyDefinition = {
	id: "clinic-sites",
	name: "Clinic Sites",
	website: "https://clinicsites.co",
	description: "Clinic Sites is a content management system that enables health clinic owners to manage clinic information and patient records.",
	icon: "ClinicSites.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "clinic-sites:dom:0",
			kind: "dom",
			selector: "a[href*='clinicsites.co'] > img[alt*='Site Powered By Clinic Sites']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

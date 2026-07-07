import type { TechnologyDefinition } from '../../types';

export const magnoliaCmsTechnologyDefinition = {
	id: "magnolia-cms",
	name: "Magnolia CMS",
	website: "https://www.magnolia-cms.com",
	description: "Magnolia CMS is a Java-based, open-source content management system that employs a modular architecture and JCR (Java Content Repository) standards, facilitating the creation, storage, and retrieval of digital content within a customisable framework.",
	icon: "Magnolia CMS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
			"high",
			"poa",
			"recurring",
		],
		cpe: "cpe:2.3:a:magnolia-cms:magnolia_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;

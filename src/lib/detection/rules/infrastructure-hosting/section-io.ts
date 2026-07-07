import type { TechnologyDefinition } from '../../types';

export const sectionIoTechnologyDefinition = {
	id: "section-io",
	name: "Section.io",
	website: "https://www.section.io",
	description: "Section.io is a Content Delivery Network (CDN).",
	icon: "sectionio.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
} as const satisfies TechnologyDefinition;

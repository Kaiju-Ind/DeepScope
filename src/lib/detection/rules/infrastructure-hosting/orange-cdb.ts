import type { TechnologyDefinition } from '../../types';

export const orangeCdbTechnologyDefinition = {
	id: "orange-cdb",
	name: "Orange CDB",
	website: "https://wholesale.orange.com/international/en/our-solutions/cdn-content-delivery-boost.html",
	description: "Orange CDB is a content delivery network (CDN) and edge computing solution that accelerates content distribution, improves traffic handling, and enhances performance by delivering web resources through geographically distributed servers.",
	icon: "OrangeCDB.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const f5DistributedCloudServicesTechnologyDefinition = {
	id: "f5-distributed-cloud-services",
	name: "F5 Distributed Cloud Services",
	website: "https://www.f5.com/products/distributed-cloud-services",
	description: "F5 Distributed Cloud Services is a SaaS platform providing security, networking, and application management to deploy, secure, and operate applications in cloud-native environments.",
	icon: "F5DistributedCloudServices.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const amazonEfsTechnologyDefinition = {
	id: "amazon-efs",
	name: "Amazon EFS",
	website: "https://aws.amazon.com/efs/",
	description: "Amazon Elastic File System is a cloud storage service provided by Amazon Web Services.",
	icon: "Amazon EFS.svg",
	categories: [
		"network-hardware",
	],
	rules: [],
	metadata: {
		saas: true,
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;

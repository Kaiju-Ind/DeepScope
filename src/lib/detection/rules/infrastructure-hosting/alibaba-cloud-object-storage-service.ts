import type { TechnologyDefinition } from '../../types';

export const alibabaCloudObjectStorageServiceTechnologyDefinition = {
	id: "alibaba-cloud-object-storage-service",
	name: "Alibaba Cloud Object Storage Service",
	website: "https://www.alibabacloud.com/product/object-storage-service",
	description: "Alibaba Cloud Object Storage Service (OSS) is a cloud-based object storage service provided by Alibaba Cloud, which allows users to store and access large amounts of data in the cloud.",
	icon: "Alibaba Cloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

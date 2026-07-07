import type { TechnologyDefinition } from '../../types';

export const upcloudObjectStorageTechnologyDefinition = {
	id: "upcloud-object-storage",
	name: "UpCloud Object Storage",
	website: "https://upcloud.com/products/object-storage/",
	description: "UpCloud Object Storage is an S3-compatible managed object storage service for static hosting and unstructured data.",
	icon: "UpCloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "upcloud-object-storage:dns:0",
			kind: "dns",
			valuePattern: new RegExp("^[a-z0-9]+\\.upcloudobjects\\.com\\.?$", "i"),
			recordType: "CNAME",
			description: "DNS record matches a known technology marker.",
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

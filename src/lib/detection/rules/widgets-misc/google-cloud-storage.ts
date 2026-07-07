import type { TechnologyDefinition } from '../../types';

export const googleCloudStorageTechnologyDefinition = {
	id: "google-cloud-storage",
	name: "Google Cloud Storage",
	website: "https://cloud.google.com/storage",
	description: "Google Cloud Storage allows world-wide storage and retrieval of any amount of data at any time.",
	icon: "google-cloud-storage.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "google-cloud-storage:header:0",
			kind: "header",
			key: "x-goog-storage-class",
			valuePattern: new RegExp("^\\w+$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"google-cloud",
	],
} as const satisfies TechnologyDefinition;

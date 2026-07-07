import type { TechnologyDefinition } from '../../types';

export const dropboxTechnologyDefinition = {
	id: "dropbox",
	name: "Dropbox",
	website: "https://www.dropbox.com",
	description: "Dropbox is a cloud storage and file synchronization service.",
	icon: "Dropbox.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "dropbox:dns:0",
			kind: "dns",
			valuePattern: new RegExp("dropbox-domain-verification", "i"),
			recordType: "TXT",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:dropbox:dropbox:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

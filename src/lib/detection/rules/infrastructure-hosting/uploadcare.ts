import type { TechnologyDefinition } from '../../types';

export const uploadcareTechnologyDefinition = {
	id: "uploadcare",
	name: "Uploadcare",
	website: "https://uploadcare.com",
	description: "Uploadcare is a complete file handling platform for online business. Receive files from you users via File Uploader or File Upload API, implement image optimization and transformations with Image CDN API, and get HIPAA-compliant storage.",
	icon: "Uploadcare.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "uploadcare:dom:0",
			kind: "dom",
			selector: "img[src*='.ucarecdn.com/'], link[href*='ucarecdn.com'], img[data-src*='.ucarecdn.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "uploadcare:jsGlobal:1",
			kind: "jsGlobal",
			property: "uploadcare.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

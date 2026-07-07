import type { TechnologyDefinition } from '../../types';

export const storagepugTechnologyDefinition = {
	id: "storagepug",
	name: "StoragePug",
	website: "https://www.storagepug.com",
	description: "StoragePug is a real estate rental conversion tool designed to capture and manage inquiries from property listings.",
	icon: "StoragePug.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "storagepug:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.storagepug\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

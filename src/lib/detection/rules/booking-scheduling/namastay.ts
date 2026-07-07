import type { TechnologyDefinition } from '../../types';

export const namastayTechnologyDefinition = {
	id: "namastay",
	name: "Namastay",
	website: "https://www.namastay.io",
	description: "Namastay is an optimized booking engine that simplifies the online guest journey to increase direct bookings.",
	icon: "Namastay.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "namastay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.namastay\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "namastay:jsGlobal:1",
			kind: "jsGlobal",
			property: "closeNamastay",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "namastay:jsGlobal:2",
			kind: "jsGlobal",
			property: "initNamastay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

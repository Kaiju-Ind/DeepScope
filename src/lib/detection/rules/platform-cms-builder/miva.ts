import type { TechnologyDefinition } from '../../types';

export const mivaTechnologyDefinition = {
	id: "miva",
	name: "Miva",
	website: "https://www.miva.com",
	description: "Miva is a privately owned ecommerce shopping cart software and hosting company with headquarters in San Diego.",
	icon: "miva.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "miva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mvga\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:1",
			kind: "jsGlobal",
			property: "MivaVM_API",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:2",
			kind: "jsGlobal",
			property: "MivaVM_Version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:3",
			kind: "jsGlobal",
			property: "mivaJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:4",
			kind: "jsGlobal",
			property: "mivaJS.Page",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:5",
			kind: "jsGlobal",
			property: "mivaJS.Product_Code",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:6",
			kind: "jsGlobal",
			property: "mivaJS.Product_ID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:7",
			kind: "jsGlobal",
			property: "mivaJS.Screen",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:jsGlobal:8",
			kind: "jsGlobal",
			property: "mivaJS.Store_Code",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "miva:header:9",
			kind: "header",
			key: "content-disposition",
			valuePattern: new RegExp("filename=(?:mvga\\.js|MivaEvents\\.js)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "miva:header:10",
			kind: "header",
			key: "content-disposition",
			valuePattern: new RegExp("filename=(?:mvga\\.js|mivaevents\\.js)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

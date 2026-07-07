import type { TechnologyDefinition } from '../../types';

export const optinopoliTechnologyDefinition = {
	id: "optinopoli",
	name: "Optinopoli",
	website: "https://www.optinopoli.com",
	description: "Optinopoli is a next-generation lead capture and sales conversion technology designed to collect, manage, and convert prospective customer information across digital touchpoints.",
	icon: "Optinopoli.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "optinopoli:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.optinopoli\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optinopoli:jsGlobal:1",
			kind: "jsGlobal",
			property: "optinopoli",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

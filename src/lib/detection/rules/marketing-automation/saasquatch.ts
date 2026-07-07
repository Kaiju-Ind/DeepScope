import type { TechnologyDefinition } from '../../types';

export const saasquatchTechnologyDefinition = {
	id: "saasquatch",
	name: "SaaSquatch",
	website: "https://www.saasquatch.com",
	description: "SaaSquatch is a cloud-based loyalty, referral and rewards marketing platform.",
	icon: "SaaSquatch.svg",
	categories: [
		"marketing-automation",
		"commerce-operations",
	],
	rules: [
		{
			id: "saasquatch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\.cloudfront\\.net\\/assets\\/javascripts\\/(?:v2\\/)?|\\/sas)squatch\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "saasquatch:jsGlobal:1",
			kind: "jsGlobal",
			property: "SAASQUATCH_TENANT_ALIAS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "saasquatch:jsGlobal:2",
			kind: "jsGlobal",
			property: "squatch.CtaWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "saasquatch:jsGlobal:3",
			kind: "jsGlobal",
			property: "squatchQuery",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

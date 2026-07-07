import type { TechnologyDefinition } from '../../types';

export const emplifiUgcTechnologyDefinition = {
	id: "emplifi-ugc",
	name: "Emplifi UGC",
	website: "https://emplifi.io/products/social-commerce/social-ugc",
	description: "Emplifi UGC is a platform that helps brands curate, measure, and integrate user-generated content to enhance engagement, authenticity, and ecommerce performance by offering features like product page galleries, social media contests, shoppable content, and detailed analytics.",
	icon: "Emplifi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "emplifi-ugc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.pixlee\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "emplifi-ugc:jsGlobal:1",
			kind: "jsGlobal",
			property: "Pixlee",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "emplifi-ugc:jsGlobal:2",
			kind: "jsGlobal",
			property: "Pixlee_Analytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "emplifi-ugc:jsGlobal:3",
			kind: "jsGlobal",
			property: "TurnTo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "emplifi-ugc:jsGlobal:4",
			kind: "jsGlobal",
			property: "turnToConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

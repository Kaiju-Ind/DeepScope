import type { TechnologyDefinition } from '../../types';

export const acquiaPersonalizationTechnologyDefinition = {
	id: "acquia-personalization",
	name: "Acquia Personalization",
	website: "https://www.acquia.com/products/marketing-cloud/personalization",
	description: "Acquia Personalization (formerly Acquia Lift) lets you track customers' behavior throughout your website.",
	icon: "acquia-personalization.png",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "acquia-personalization:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("lift\\.acquia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "acquia-personalization:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("lift\\.acquia\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "acquia-personalization:dom:2",
			kind: "dom",
			selector: "[data-lift-slot]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "acquia-personalization:jsGlobal:3",
			kind: "jsGlobal",
			property: "AcquiaLift",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "acquia-personalization:jsGlobal:4",
			kind: "jsGlobal",
			property: "_tcaq",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"acquia-cloud-platform-confidence-95",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const nswDesignSystemTechnologyDefinition = {
	id: "nsw-design-system",
	name: "NSW Design System",
	website: "https://www.digital.nsw.gov.au/digital-design-system",
	icon: "NSW Design System.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "nsw-design-system:dom:0",
			kind: "dom",
			selector: ".nsw-container, .nsw-header, .nsw-icon, link[href*='nsw-design-system']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nsw-design-system:jsGlobal:1",
			kind: "jsGlobal",
			property: "NSW.initSite",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

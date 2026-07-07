import type { TechnologyDefinition } from '../../types';

export const uswdsTechnologyDefinition = {
	id: "uswds",
	name: "USWDS",
	website: "https://designsystem.digital.gov",
	description: "USWDS is a design system for the federal government.",
	icon: "USWDS.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "uswds:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\buswds\\b"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uswds:jsGlobal:1",
			kind: "jsGlobal",
			property: "uswdsPresent",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

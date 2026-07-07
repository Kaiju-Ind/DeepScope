import type { TechnologyDefinition } from '../../types';

export const govUkToolkitTechnologyDefinition = {
	id: "gov-uk-toolkit",
	name: "GOV.UK Toolkit",
	website: "https://github.com/alphagov/govuk_frontend_toolkit",
	description: "GOV.UK Toolkit is a set of front-end utilities and helpers for GOV.UK-style services.",
	icon: "govuk.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "gov-uk-toolkit:jsGlobal:0",
			kind: "jsGlobal",
			property: "GOVUK.details",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gov-uk-toolkit:jsGlobal:1",
			kind: "jsGlobal",
			property: "GOVUK.modules",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gov-uk-toolkit:jsGlobal:2",
			kind: "jsGlobal",
			property: "GOVUK.primaryLinks",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

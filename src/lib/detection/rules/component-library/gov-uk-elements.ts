import type { TechnologyDefinition } from '../../types';

export const govUkElementsTechnologyDefinition = {
	id: "gov-uk-elements",
	name: "GOV.UK Elements",
	website: "https://github.com/alphagov/govuk_elements/",
	icon: "govuk.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "gov-uk-elements:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+elements-page[^>\"]+css"),
			confidence: 25,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-elements:html:1",
			kind: "html",
			pattern: new RegExp("<div[^>]+phase-banner-alpha"),
			confidence: 25,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-elements:html:2",
			kind: "html",
			pattern: new RegExp("<div[^>]+phase-banner-beta"),
			confidence: 25,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-elements:html:3",
			kind: "html",
			pattern: new RegExp("<div[^>]+govuk-box-highlight"),
			confidence: 25,
			description: "HTML contains a known technology signature.",
		},
	],
	implies: [
		"gov-uk-toolkit",
	],
} as const satisfies TechnologyDefinition;

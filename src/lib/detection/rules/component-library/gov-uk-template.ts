import type { TechnologyDefinition } from '../../types';

export const govUkTemplateTechnologyDefinition = {
	id: "gov-uk-template",
	name: "GOV.UK Template",
	website: "https://github.com/alphagov/govuk_template/",
	description: "GOV.UK Template provides the base HTML, CSS, and assets for GOV.UK-style pages.",
	icon: "govuk.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "gov-uk-template:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("govuk-template\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gov-uk-template:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+govuk-template[^>\"]+css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-template:html:2",
			kind: "html",
			pattern: new RegExp("<link[^>]+govuk-template-print[^>\"]+css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-template:html:3",
			kind: "html",
			pattern: new RegExp("<link[^>]+govuk-template-ie6[^>\"]+css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-template:html:4",
			kind: "html",
			pattern: new RegExp("<link[^>]+govuk-template-ie7[^>\"]+css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-template:html:5",
			kind: "html",
			pattern: new RegExp("<link[^>]+govuk-template-ie8[^>\"]+css"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-template:jsGlobal:6",
			kind: "jsGlobal",
			property: "GOVUK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

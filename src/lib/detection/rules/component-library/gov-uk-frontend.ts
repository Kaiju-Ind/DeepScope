import type { TechnologyDefinition } from '../../types';

export const govUkFrontendTechnologyDefinition = {
	id: "gov-uk-frontend",
	name: "GOV.UK Frontend",
	website: "https://design-system.service.gov.uk/",
	description: "GOV.UK Frontend is the design system and component library for GOV.UK services.",
	icon: "govuk.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "gov-uk-frontend:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("govuk-frontend(?:[^>]*?([0-9a-fA-F]{7,40}|[\\d]+(?:.[\\d]+(?:.[\\d]+)?)?)|)[^>]*?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gov-uk-frontend:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]*?govuk-frontend(?:[^>]*?([0-9a-fA-F]{7,40}|[\\d]+(?:.[\\d]+(?:.[\\d]+)?)?)|)[^>]*?(?:\\.min)?\\.css"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-frontend:html:2",
			kind: "html",
			pattern: new RegExp("<body[^>]+govuk-template__body"),
			confidence: 80,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-frontend:html:3",
			kind: "html",
			pattern: new RegExp("<a[^>]+govuk-link"),
			confidence: 10,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "gov-uk-frontend:jsGlobal:4",
			kind: "jsGlobal",
			property: "GOVUKFrontend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gov-uk-frontend:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("govuk-frontend(?:[^>]*?([0-9a-fa-f]{7,40}|[\\d]+(?:.[\\d]+(?:.[\\d]+)?)?)|)[^>]*?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gov-uk-frontend:html:6",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]*?govuk-frontend(?:[^>]*?([0-9a-fa-f]{7,40}|[\\d]+(?:.[\\d]+(?:.[\\d]+)?)?)|)[^>]*?(?:\\.min)?\\.css"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
	],
} as const satisfies TechnologyDefinition;

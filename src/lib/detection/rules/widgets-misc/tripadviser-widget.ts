import type { TechnologyDefinition } from '../../types';

export const tripadviserWidgetTechnologyDefinition = {
	id: "tripadviser-widget",
	name: "Tripadviser.Widget",
	website: "https://www.tripadvisor.com/Widgets",
	description: "Tripadvisor embed reviews widget.",
	icon: "Tripadviser.Widget.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tripadviser-widget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tripadvisor\\.[\\w]+\\/WidgetEmbed"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tripadviser-widget:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("tripadvisor\\.[\\w]+\\/widgetembed"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

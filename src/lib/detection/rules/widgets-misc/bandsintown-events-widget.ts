import type { TechnologyDefinition } from '../../types';

export const bandsintownEventsWidgetTechnologyDefinition = {
	id: "bandsintown-events-widget",
	name: "BandsInTown Events Widget",
	website: "https://artists.bandsintown.com/support/events-widget",
	description: "Bandsintown Events Widget is a free widget which makes it simple to embed your event listings and allow fans to buy tickets, RSVP, follow you and join your Email & SMS lists.",
	icon: "BandsInTown.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "bandsintown-events-widget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.bandsintown\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

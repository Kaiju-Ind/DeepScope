import type { TechnologyDefinition } from '../../types';

export const spotifyWidgetsTechnologyDefinition = {
	id: "spotify-widgets",
	name: "Spotify Widgets",
	website: "https://developer.spotify.com/documentation/widgets",
	description: "Spotify Widgets provide an embeddable view of a track, artist, album, user, playlist, podcast or episode for use within your web project.",
	icon: "Spotify.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "spotify-widgets:dom:0",
			kind: "dom",
			selector: "iframe[src*='open.spotify.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "spotify-widgets:dom:1",
			kind: "dom",
			selector: "iframe[src*='open.spotify.com/'], link[href*='open.spotify.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;

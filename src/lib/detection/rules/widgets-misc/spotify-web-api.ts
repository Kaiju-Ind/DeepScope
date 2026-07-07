import type { TechnologyDefinition } from '../../types';

export const spotifyWebApiTechnologyDefinition = {
	id: "spotify-web-api",
	name: "Spotify Web API",
	website: "https://developer.spotify.com/documentation/web-api",
	description: "Spotify Web API endpoints return JSON metadata about music artists, albums, and tracks, directly from the Spotify Data Catalogue.",
	icon: "Spotify.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "spotify-web-api:dom:0",
			kind: "dom",
			selector: "link[href*='.spotify.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "spotify-web-api:jsGlobal:1",
			kind: "jsGlobal",
			property: "getSpotifyData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spotify-web-api:jsGlobal:2",
			kind: "jsGlobal",
			property: "spotify_tracks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spotify-web-api:jsGlobal:3",
			kind: "jsGlobal",
			property: "spotifyme",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;

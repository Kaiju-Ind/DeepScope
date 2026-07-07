import type { TechnologyDefinition } from '../../types';

export const bigbluebuttonTechnologyDefinition = {
	id: "bigbluebutton",
	name: "BigBlueButton",
	website: "https://bigbluebutton.org",
	description: "BigBlueButton is an open-source virtual classroom and web conferencing platform for online teaching and collaboration.",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "bigbluebutton:dom:0",
			kind: "dom",
			selector: "meta[property='og:title'][content='BigBlueButton']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bigbluebutton:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_greenlight\\-3_0_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

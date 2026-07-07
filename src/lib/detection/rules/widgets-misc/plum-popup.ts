import type { TechnologyDefinition } from '../../types';

export const plumPopupTechnologyDefinition = {
	id: "plum-popup",
	name: "Plum Popup",
	website: "https://plumpopup.com",
	description: "Plum Popup is a tool for creating customizable popups designed to help increase sales by engaging visitors and promoting offers.",
	icon: "Plum.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "plum-popup:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.plumpopup\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "plum-popup:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^plumPopupWixPerDayNew$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "plum-popup:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^plumPopupWixStartDatePerDay$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "plum-popup:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^plumpopupwixperdaynew$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "plum-popup:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^plumpopupwixstartdateperday$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;

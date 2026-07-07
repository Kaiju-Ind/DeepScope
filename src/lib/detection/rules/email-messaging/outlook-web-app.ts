import type { TechnologyDefinition } from '../../types';

export const outlookWebAppTechnologyDefinition = {
	id: "outlook-web-app",
	name: "Outlook Web App",
	website: "https://help.outlook.com",
	description: "Outlook on the web is an information manager web app. It includes a web-based email client, a calendar tool, a contact manager, and a task manager.",
	icon: "Outlook.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "outlook-web-app:html:0",
			kind: "html",
			pattern: new RegExp("<link[^>]+\\/owa\\/auth\\/([\\d\\.]+)\\/themes\\/resources"),
			version: {
				source: "match",
				group: 1,
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "outlook-web-app:url:1",
			kind: "url",
			pattern: new RegExp("\\/owa\\/auth\\/log(?:on|off)\\.aspx"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "outlook-web-app:jsGlobal:2",
			kind: "jsGlobal",
			property: "IsOwaPremiumBrowser",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "outlook-web-app:header:3",
			kind: "header",
			key: "X-OWA-Version",
			valuePattern: new RegExp("([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "outlook-web-app:dom:4",
			kind: "dom",
			selector: "link[href*='/owa/auth/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "outlook-web-app:header:5",
			kind: "header",
			key: "x-owa-version",
			valuePattern: new RegExp("([\\d\\.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:microsoft:outlook_web_access:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;

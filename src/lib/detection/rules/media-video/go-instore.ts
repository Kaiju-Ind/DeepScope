import type { TechnologyDefinition } from '../../types';

export const goInstoreTechnologyDefinition = {
	id: "go-instore",
	name: "Go Instore",
	website: "https://goinstore.com",
	description: "Go Instore uses high-definition live video to connect online customers with in-store product experts.",
	icon: "Go Instore.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "go-instore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/gis\\.goinstore\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "go-instore:jsGlobal:1",
			kind: "jsGlobal",
			property: "GISAPP.videoJsCtrl",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "go-instore:jsGlobal:2",
			kind: "jsGlobal",
			property: "gisAppLib.postRobot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "go-instore:header:3",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.goinstore\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;

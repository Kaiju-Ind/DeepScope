import type { TechnologyDefinition } from '../../types';

export const clientjsTechnologyDefinition = {
	id: "clientjs",
	name: "ClientJS",
	website: "https://clientjs.org",
	description: "ClientJS is a JavaScript library for generating browser fingerprints, exposing all the browser data-points.",
	icon: "ClientJS.png",
	categories: [
		"widgets-misc",
		"privacy-compliance",
	],
	rules: [
		{
			id: "clientjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/clientjs@(\\d.*?)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clientjs:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ClientJS\\/(?:(\\d.*?)\\/)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clientjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "ClientJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "clientjs:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("\\/clientjs@([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clientjs:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ClientJS\\/([\\d.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clientjs:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("\\/clientjs\\/([\\d.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;

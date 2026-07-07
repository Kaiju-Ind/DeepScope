import type { TechnologyDefinition } from '../../types';

export const modDavTechnologyDefinition = {
	id: "mod-dav",
	name: "mod_dav",
	website: "https://webdav.org/mod_dav",
	description: "Mod_dav is an Apache module to provide WebDAV capabilities for your Apache web server. It is an open-source module, provided under an Apache-style license.",
	icon: "Apache.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "mod-dav:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("\\b(?:mod_)?DAV\\b(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mod-dav:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\b(?:mod_)?dav\\b(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"apache-http-server",
	],
} as const satisfies TechnologyDefinition;

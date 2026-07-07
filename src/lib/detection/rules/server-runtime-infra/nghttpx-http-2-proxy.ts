import type { TechnologyDefinition } from '../../types';

export const nghttpxHttp2ProxyTechnologyDefinition = {
	id: "nghttpx-http-2-proxy",
	name: "nghttpx - HTTP/2 proxy",
	website: "https://nghttp2.org",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "nghttpx-http-2-proxy:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("nghttpx nghttp2\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nghttpx-http-2-proxy:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("nghttpx nghttp2\\/?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

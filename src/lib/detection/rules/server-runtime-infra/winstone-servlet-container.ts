import type { TechnologyDefinition } from '../../types';

export const winstoneServletContainerTechnologyDefinition = {
	id: "winstone-servlet-container",
	name: "Winstone Servlet Container",
	website: "https://winstone.sourceforge.net",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "winstone-servlet-container:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Winstone Servlet (?:Container|Engine) v?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "winstone-servlet-container:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Winstone(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "winstone-servlet-container:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("winstone servlet (?:container|engine) v?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "winstone-servlet-container:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("winstone(?:\\/([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

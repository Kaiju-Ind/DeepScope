import type { TechnologyDefinition } from '../../types';

export const applicationRequestRoutingTechnologyDefinition = {
	id: "application-request-routing",
	name: "Application Request Routing",
	website: "https://www.iis.net/downloads/microsoft/application-request-routing",
	description: "Application Request Routing (ARR) is an extension to Internet Information Server (IIS), which enables an IIS server to function as a load balancer.",
	icon: "Microsoft.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "application-request-routing:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^ARR\\/([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "application-request-routing:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^arr\\/([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"iis",
	],
} as const satisfies TechnologyDefinition;

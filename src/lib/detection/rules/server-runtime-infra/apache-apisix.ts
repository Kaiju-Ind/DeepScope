import type { TechnologyDefinition } from '../../types';

export const apacheApisixTechnologyDefinition = {
	id: "apache-apisix",
	name: "Apache APISIX",
	website: "https://apisix.apache.org",
	description: "Apache APISIX is an open-source, cloud-native API gateway developed by the Apache Software Foundation. It provides a scalable and high-performance solution for managing and securing API traffic.",
	icon: "Apache APISIX.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "apache-apisix:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^APISIX(?:\\/([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "apache-apisix:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^apisix(?:\\/([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apache:apisix:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

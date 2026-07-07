import type { TechnologyDefinition } from '../../types';

export const kibanaTechnologyDefinition = {
	id: "kibana",
	name: "Kibana",
	website: "https://www.elastic.co/products/kibana",
	description: "Kibana is an open-source data visualisation dashboard for Elasticsearch. It provides visualisation capabilities on top of the content indexed on an Elasticsearch cluster. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of data.",
	icon: "kibana.svg",
	categories: [
		"search",
		"graphics-visualization",
	],
	rules: [
		{
			id: "kibana:html:0",
			kind: "html",
			pattern: new RegExp("<title>Kibana<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "kibana:url:1",
			kind: "url",
			pattern: new RegExp("kibana#\\/dashboard\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "kibana:header:2",
			kind: "header",
			key: "kbn-name",
			valuePattern: new RegExp("kibana", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kibana:header:3",
			kind: "header",
			key: "kbn-version",
			valuePattern: new RegExp("^([\\d.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kibana:html:4",
			kind: "html",
			pattern: new RegExp("<title>kibana<\\/title>"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:elasticsearch:kibana:*:*:*:*:*:*:*:*",
	},
	implies: [
		"elasticsearch",
		"node-js",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const llamalinkCloudServerTechnologyDefinition = {
	id: "llamalink-cloud-server",
	name: "LlamaLink Cloud Server",
	website: "https://llamalink.net",
	description: "LlamaLink Cloud Server is a custom dynamic web server based on Nginx Web server that load balance user traffic between hosting nodes and allows fast and cached experience to web and app users.",
	icon: "LlamaLink.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "llamalink-cloud-server:header:0",
			kind: "header",
			key: "Serverversion",
			valuePattern: new RegExp("^LlamaLink", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "llamalink-cloud-server:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^LlamaLink", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "llamalink-cloud-server:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^llamalink", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
	implies: [
		"nginx",
	],
} as const satisfies TechnologyDefinition;

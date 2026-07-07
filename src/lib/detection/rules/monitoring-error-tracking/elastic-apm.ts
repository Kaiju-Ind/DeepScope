import type { TechnologyDefinition } from '../../types';

export const elasticApmTechnologyDefinition = {
	id: "elastic-apm",
	name: "Elastic APM",
	website: "https://www.elastic.co/apm",
	description: "Elastic APM is a distributed tracing and metrics collection system that helps you monitor and troubleshoot your applications.",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "elastic-apm:scriptContent:modern:0",
			kind: "scriptContent",
			pattern: new RegExp("prefix:\\s*['\"']\\[Elastic APM] ['\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "elastic-apm:scriptContent:modern:1",
			kind: "scriptContent",
			pattern: new RegExp("[a-zA-Z_$][a-zA-Z0-9_$]*\\.log\\(['\"']\\[Elastic APM] platform is not supported!['\"']\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "elastic-apm:scriptContent:modern:2",
			kind: "scriptContent",
			pattern: new RegExp("distributedTracingHeaderName:['\"']elastic-apm-traceparent['\"']"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "elastic-apm:scriptContent:modern:3",
			kind: "scriptContent",
			pattern: new RegExp("getElasticScript:[a-zA-Z_$][a-zA-Z0-9_$]*"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
		{
			id: "elastic-apm:scriptContent:modern:4",
			kind: "scriptContent",
			pattern: new RegExp("this\\._configService\\.get\\(['\"']similarSpanThreshold['\"']\\)"),
			confidence: 75,
			description: "Bundled script content matches a modern tooling marker.",
		},
	],
} as const satisfies TechnologyDefinition;

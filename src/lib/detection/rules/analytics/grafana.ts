import type { TechnologyDefinition } from '../../types';

export const grafanaTechnologyDefinition = {
	id: "grafana",
	name: "Grafana",
	website: "https://grafana.com",
	description: "Grafana is a multi-platform open source analytics and interactive visualisation web application.",
	icon: "Grafana.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "grafana:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("grafana\\..+\\.com\\/public\\/build\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "grafana:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("grafanaBootData\\s*=\\s*\\{[\\s\\S]{0,12000}?\"buildInfo\"\\s*:\\s*\\{[^}]{0,1024}?\"latestVersion\"\\s*:\\s*\"[\\d\\w\\.-]+\"\\s*,\\s*\"version\"\\s*:\\s*\"([\\d.]+)\""),
			confidence: 75,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Inline Grafana boot data exposes a bounded buildInfo version marker.",
		},
		{
			id: "grafana:jsGlobal:2",
			kind: "jsGlobal",
			property: "__grafana_public_path__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "grafana:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("grafanaBootData\\s*="),
			confidence: 75,
			description: "Inline script assigns Grafana boot data.",
		},
		{
			id: "grafana:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("grafanaBootData\\s*=\\s*\\{[\\s\\S]{0,12000}?\"buildInfo\"\\s*:\\s*\\{[^}]{0,1024}?\"latestversion\"\\s*:\\s*\"[\\d\\w\\.-]+\"\\s*,\\s*\"version\"\\s*:\\s*\"([\\d.]+)\""),
			confidence: 75,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Inline Grafana boot data exposes a bounded lowercase buildInfo version marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:grafana:grafana:*:*:*:*:*:*:*:*",
	},
	implies: [
		"go",
		"macaron",
	],
} as const satisfies TechnologyDefinition;

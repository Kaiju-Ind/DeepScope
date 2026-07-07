import type { TechnologyDefinition } from '../../types';

export const downloadMonitorTechnologyDefinition = {
	id: "download-monitor",
	name: "Download Monitor",
	website: "https://www.download-monitor.com",
	description: "Download Monitor is a plugin for selling, uploading and managing downloads, tracking downloads and displaying links.",
	icon: "Download Monitor.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "download-monitor:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/download-monitor/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "download-monitor:jsGlobal:1",
			kind: "jsGlobal",
			property: "DLM_XHR_Download",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "download-monitor:jsGlobal:2",
			kind: "jsGlobal",
			property: "dlmXHR.prevent_duplicates",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "download-monitor:meta:3",
			kind: "meta",
			key: "dlm-version",
			valuePattern: new RegExp("^([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
		cpe: "cpe:2.3:a:wpchill:download_monitor:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const unifiOsTechnologyDefinition = {
	id: "unifi-os",
	name: "UniFi OS",
	website: "https://www.ui.com/",
	description: "UniFi OS is the operating system for UniFi products, which provides a user interface.",
	icon: "UniFi_OS.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "unifi-os:jsGlobal:0",
			kind: "jsGlobal",
			property: "unifiConstant.VERSION",
			valuePattern: new RegExp("^([\\d+\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:ui:unifi_os:*:*:*:*:*:*:*:*",
	},
	requires: [
		"angularjs",
	],
} as const satisfies TechnologyDefinition;

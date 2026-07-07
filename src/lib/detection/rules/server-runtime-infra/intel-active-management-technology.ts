import type { TechnologyDefinition } from '../../types';

export const intelActiveManagementTechnologyTechnologyDefinition = {
	id: "intel-active-management-technology",
	name: "Intel Active Management Technology",
	website: "https://intel.com",
	description: "Intel Active Management Technology (AMT) is a proprietary remote management and control system for personal computers with Intel CPUs.",
	icon: "Intel Active Management Technology.png",
	categories: [
		"server-runtime-infra",
		"network-hardware",
	],
	rules: [
		{
			id: "intel-active-management-technology:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Intel\\(R\\) Active Management Technology(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "intel-active-management-technology:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("intel\\(r\\) active management technology(?: ([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:intel:active_management_technology:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

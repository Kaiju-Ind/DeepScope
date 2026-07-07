import type { TechnologyDefinition } from '../../types';

export const centosTechnologyDefinition = {
	id: "centos",
	name: "CentOS",
	website: "https://centos.org",
	description: "CentOS is a Linux distribution that provides a free, community-supported computing platform functionally compatible with its upstream source, Red Hat Enterprise Linux (RHEL).",
	icon: "CentOS.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "centos:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("CentOS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "centos:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("CentOS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "centos:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("centos", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "centos:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("centos", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:centos:centos:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

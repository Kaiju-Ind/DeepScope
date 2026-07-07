import type { TechnologyDefinition } from '../../types';

export const ubuntuTechnologyDefinition = {
	id: "ubuntu",
	name: "Ubuntu",
	website: "https://www.ubuntu.com/server",
	description: "Ubuntu is a free and open-source operating system on Linux for the enterprise server, desktop, cloud, and IoT.",
	icon: "Ubuntu.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "ubuntu:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Ubuntu", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ubuntu:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Ubuntu", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ubuntu:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("ubuntu", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ubuntu:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("ubuntu", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:o:canonical:ubuntu_linux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

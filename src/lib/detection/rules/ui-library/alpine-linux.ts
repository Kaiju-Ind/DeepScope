import type { TechnologyDefinition } from '../../types';

export const alpineLinuxTechnologyDefinition = {
	id: "alpine-linux",
	name: "Alpine Linux",
	website: "https://www.alpinelinux.org",
	description: "Alpine Linux is a security-oriented, lightweight Linux distribution based on musl libc and busybox.",
	icon: "Alpine Linux.svg",
	categories: [
		"ui-library",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "alpine-linux:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Alpine", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "alpine-linux:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("alpine", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:o:alpinelinux:alpine_linux:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;

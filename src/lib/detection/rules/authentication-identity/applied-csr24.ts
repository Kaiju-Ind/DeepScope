import type { TechnologyDefinition } from '../../types';

export const appliedCsr24TechnologyDefinition = {
	id: "applied-csr24",
	name: "Applied CSR24",
	website: "https://www1.appliedsystems.com/en-us/solutions/for-agents/mobility/applied-csr24/?_gl=1*jl1i3u*_up*MQ..*_gs*MQ..&gclid=CjwKCAiAn9a9BhBtEiwAbKg6fvbF0KJMjT1nWOuoNHScUZDHi_lH5kKLqrnAy0DtTbe6LIIgn-toYRoCp4MQAvD_BwE",
	description: "CSR24 is a portal login used by insurance agencies and brokerages that allows clients to access and review their policies.",
	icon: "AppliedCSR24.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "applied-csr24:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("portal\\.csr24\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "applied-csr24:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.csr24\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "applied-csr24:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.csr24\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;

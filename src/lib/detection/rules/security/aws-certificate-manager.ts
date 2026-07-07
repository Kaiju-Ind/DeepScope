import type { TechnologyDefinition } from '../../types';

export const awsCertificateManagerTechnologyDefinition = {
	id: "aws-certificate-manager",
	name: "AWS Certificate Manager",
	website: "https://aws.amazon.com/certificate-manager/",
	description: "AWS Certificate Manager is a service that lets you easily provision, manage, and deploy public and private Secure Sockets Layer/Transport Layer Security (SSL/TLS) certificates for use with AWS services and your internal connected resources.",
	icon: "AWS Certificate Manager.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "aws-certificate-manager:certIssuer:0",
			kind: "certIssuer",
			pattern: new RegExp("Amazon"),
			description: "Certificate issuer matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:awstats:awstats:*:*:*:*:*:*:*:*",
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;

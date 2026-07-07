import type { TechnologyDefinition } from '../../types';

export const amazonCloudfrontTechnologyDefinition = {
	id: "amazon-cloudfront",
	name: "Amazon CloudFront",
	website: "https://aws.amazon.com/cloudfront/",
	description: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency, high transfer speeds.",
	icon: "Amazon Cloudfront.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "amazon-cloudfront:header:0",
			kind: "header",
			key: "Via",
			valuePattern: new RegExp("\\(CloudFront\\)$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-cloudfront:dns:1",
			kind: "dns",
			valuePattern: new RegExp("^[a-z0-9]+\\.cloudfront.net\\.?$", "i"),
			recordType: "CNAME",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "amazon-cloudfront:header:2",
			kind: "header",
			key: "via",
			valuePattern: new RegExp("\\(cloudfront\\)$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:amazon:amazon_cloudfront:*:*:*:*:*:*:*:*",
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;

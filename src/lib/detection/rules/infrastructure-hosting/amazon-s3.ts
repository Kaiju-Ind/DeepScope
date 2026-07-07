import type { TechnologyDefinition } from '../../types';

export const amazonS3TechnologyDefinition = {
	id: "amazon-s3",
	name: "Amazon S3",
	website: "https://aws.amazon.com/s3/",
	description: "Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services (AWS) that provides object storage through a web service interface.",
	icon: "Amazon S3.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "amazon-s3:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s3[^ ]*\\.amazonaws\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amazon-s3:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("s3[^ ]*amazonaws\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-s3:header:2",
			kind: "header",
			key: "Content-Security-Policy-Report-Only",
			valuePattern: new RegExp("s3[^ ]*\\.amazonaws\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-s3:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^AmazonS3$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-s3:header:4",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("s3[^ ]*amazonaws\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-s3:header:5",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("s3[^ ]*\\.amazonaws\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-s3:header:6",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^amazons3$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	implies: [
		"amazon-web-services",
	],
} as const satisfies TechnologyDefinition;

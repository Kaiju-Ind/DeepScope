import type { TechnologyDefinition } from '../../types';

export const amazonCloudwatchRumTechnologyDefinition = {
	id: "amazon-cloudwatch-rum",
	name: "Amazon CloudWatch RUM",
	website: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-RUM.html",
	description: "Amazon CloudWatch RUM is a real-user monitoring capability that helps you identify and debug issues in the client-side on web applications and enhance end user's digital experience.",
	icon: "Amazon CloudWatch.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "amazon-cloudwatch-rum:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("client\\.rum\\.[a-z0-9-]+\\.amazonaws\\.com\\/([\\d.]+)\\/cwr\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amazon-cloudwatch-rum:jsGlobal:0",
			kind: "jsGlobal",
			property: "AwsRum",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amazon-cloudwatch-rum:jsGlobal:1",
			kind: "jsGlobal",
			property: "AwsRumClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amazon-cloudwatch-rum:jsGlobal:2",
			kind: "jsGlobal",
			property: "AwsRumClient.v",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amazon-cloudwatch-rum:jsGlobal:3",
			kind: "jsGlobal",
			property: "AwsRumConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;

import type { TechnologyDefinition } from '../../types';

export const amazonEc2TechnologyDefinition = {
	id: "amazon-ec2",
	name: "Amazon EC2",
	website: "https://aws.amazon.com/ec2/",
	description: "Amazon Elastic Compute Cloud is a part of Amazon.com's cloud-computing platform, Amazon Web Services, that allows users to rent virtual computers on which to run their own computer applications.",
	icon: "Amazon EC2.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "amazon-ec2:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("\\(Amazon\\)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-ec2:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("\\(amazon\\)", "i"),
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

import type { TechnologyDefinition } from '../../types';

export const amazonElbTechnologyDefinition = {
	id: "amazon-elb",
	name: "Amazon ELB",
	website: "https://aws.amazon.com/elasticloadbalancing/",
	description: "AWS ELB is a network load balancer service provided by Amazon Web Services for distributing traffic across multiple targets, such as Amazon EC2 instances, containers, IP addresses, and Lambda functions.",
	icon: "Amazon ELB.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "amazon-elb:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^AWSELB$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "amazon-elb:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("awselb", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "amazon-elb:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^awselb$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "amazon-elb:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("awselb", "i"),
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

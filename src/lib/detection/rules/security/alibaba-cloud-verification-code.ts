import type { TechnologyDefinition } from '../../types';

export const alibabaCloudVerificationCodeTechnologyDefinition = {
	id: "alibaba-cloud-verification-code",
	name: "Alibaba Cloud Verification Code",
	website: "https://help.aliyun.com/document_detail/193141.html",
	description: "Alibaba Cloud Verification Code is a security feature provided by Alibaba Cloud to help protect user accounts from unauthorised access.",
	icon: "Alibaba Cloud.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "alibaba-cloud-verification-code:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cf\\.aliyun\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;

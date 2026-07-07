import type { TechnologyDefinition } from '../../types';

export const elementUiTechnologyDefinition = {
	id: "element-ui",
	name: "Element UI",
	website: "https://element.eleme.io/",
	description: "Element UI is an open-source component library specifically designed for Vue.js, offering a collection of pre-designed UI components such as buttons, forms, tables, and modals.",
	icon: "ElementUI.svg",
	categories: [
		"ui-library",
		"component-library",
	],
	rules: [
		{
			id: "element-ui:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]+class=\"(?:[^\"]*\\s)?el-(?:button|button-group|dialog|form|form-item|input|input-number|select|select-dropdown|table|table-column|pagination|pager|menu|menu-item|submenu|tabs|tab-pane|popover|tooltip|dropdown|dropdown-menu|message|message-box|notification|alert|checkbox|checkbox-group|radio|radio-group|switch|date-picker|time-picker|upload|carousel|collapse|tree|steps|breadcrumb|card)(?:\\s|__|--|\")", "i"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "element-ui:dom:1",
			kind: "dom",
			selector: ".el-button, .el-dialog, .el-form-item, .el-select, .el-select-dropdown, .el-table, .el-pagination, .el-message, .el-notification, .el-popover",
			confidence: 75,
			description: "DOM contains concrete Element UI component class tokens. Avoid substring matches like vercel-logo or text-label-* that merely contain el-.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"vue-js",
	],
	requires: [
		"vue-js",
	],
} as const satisfies TechnologyDefinition;

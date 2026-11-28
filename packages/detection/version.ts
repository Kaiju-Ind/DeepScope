import { execDetectionPattern } from "./pattern.ts";
import type { VersionExtraction } from "@deepscope/registry/rules";

/** Resolve static, original-match or matched-text version rules and omit empty captures after normalization. */
export function extractVersion(
	extraction: VersionExtraction | undefined,
	match: RegExpMatchArray,
	matchedValue = match[0] ?? '',
): string | undefined {
	if (!extraction) {
		return undefined;
	}

	if (extraction.source === 'static') {
		return cleanVersion(extraction.value);
	}

	const sourceMatch =
		extraction.source === 'matchedValue'
			? execDetectionPattern(extraction.pattern, matchedValue)
			: match;

	if (!sourceMatch) {
		return undefined;
	}

	if (extraction.template) {
		return cleanVersion(applyTemplate(extraction.template, sourceMatch));
	}

	const group = extraction.group ?? firstCapturingGroup(sourceMatch);
	if (group === undefined) {
		return undefined;
	}

	const value = typeof group === 'number'
		? sourceMatch[group]
		: sourceMatch.groups?.[group];

	return cleanVersion(value);
}

/** Expand numeric and named capture placeholders, replacing missing captures with empty text. */
function applyTemplate(template: string, match: RegExpMatchArray): string {
	return template.replace(/\$(\d+)|\$<([A-Za-z_$][\w$]*)>/g, (_, index: string | undefined, name: string | undefined) => {
		if (index) {
			return match[Number(index)] ?? '';
		}
		return name ? match.groups?.[name] ?? '' : '';
	});
}

/** Choose the first present capture after the full match, preserving authored group order. */
function firstCapturingGroup(match: RegExpMatchArray): number | undefined {
	for (let index = 1; index < match.length; index += 1) {
		if (match[index] !== undefined) {
			return index;
		}
	}
	return undefined;
}

/** Trim surrounding whitespace and represent an empty version as absent. */
function cleanVersion(value: string | undefined): string | undefined {
	const version = value?.trim();
	return version || undefined;
}

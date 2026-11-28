import type { Evidence } from "../../types.ts";
import type { DetectionKind, DetectionPatternType, VersionExtraction } from "@deepscope/registry/rules";

export type EvidenceMatchMetadata = Pick<Evidence, 'direct' | 'attributes'>;

export type PatternMatchRule = {
	kind: DetectionKind;
	pattern?: DetectionPatternType;
	version?: VersionExtraction;
	description?: string;
};

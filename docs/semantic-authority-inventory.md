# Semantic authority inventory

This document classifies DeepScope's local Registry before semantic authority is changed.

## Current duplication

DeepScope currently contains a local technology catalog under `src/registry/technology/catalog/`.

A path-level comparison against the current `Kaiju-Ind/kaiju-registry` catalog found:

- 8,102 DeepScope technology catalog TypeScript files;
- all 8,102 have matching relative catalog paths in Registry;
- no DeepScope catalog file exists only in DeepScope;
- Registry contains additional catalog source beyond the DeepScope copy.

Representative definitions such as Google Analytics carry the same technology identity and browser detection rules in both repositories.

This is competing canonical semantic authority and should be removed through a generated/versioned artifact, not by moving DeepScope runtime code into Intelligence.

## Intelligence / Semantics authority

The following concepts are semantic authority and should come from Intelligence:

- technology identifiers, names and canonical descriptions;
- technology/category classification;
- canonical technology relationships such as implies/requires/excludes;
- source identities and technology/component meaning;
- canonical browser-detection rule definitions where they express what evidence supports a technology;
- canonical icons/portable metadata where required by the browser product.

## DeepScope authority

DeepScope continues to own:

- browser observation and collection;
- Manifest V3/WXT execution;
- background/content/offscreen lifecycle;
- matcher worker scheduling and shard loading;
- extension-local caching and diagnostics;
- browser permission policy;
- side-panel/options UX;
- runtime-specific pattern hydration and matching implementation;
- browser-specific packaging/performance constraints.

## Mixed types that require a split

`src/lib/detection/types.ts` mixes semantic and runtime concerns.

Semantic-facing fields such as technology identity, categories, component/source identity, relationships and rule meaning should be represented by the Intelligence browser artifact.

Runtime-only concerns such as browser observation kinds, hydrated `RegExp` representation, `sourceRuleIndex`, matcher execution metadata and extension errors remain DeepScope.

Category IDs belong to semantic authority. Display labels and ordering may remain a DeepScope presentation projection unless another consumer proves they should be canonical.

## Target contract

Create the smallest deterministic browser projection from Intelligence. Acceptable shapes include a package subpath such as `@kaiju-ind/registry/browser` or a generated JSON bundle.

The projection must:

- be versioned and tied to an immutable semantic release coordinate;
- contain only data required by DeepScope;
- avoid server-only semantic/runtime machinery;
- be deterministic and hashable;
- support browser matcher sharding without changing semantic identity.

DeepScope should pin the released projection and generate its runtime shards from that exact input.

## Required cutover proof

Before deleting the local catalog:

1. generate the browser projection from Intelligence;
2. prove every currently shipped DeepScope technology/rule is represented or deliberately changed;
3. run DeepScope release checks and generated Chrome artifact validation;
4. add CI that rejects stale generated shards or mismatched semantic version/hash;
5. switch DeepScope to the released artifact;
6. remove the duplicated catalog only after the new path is green.

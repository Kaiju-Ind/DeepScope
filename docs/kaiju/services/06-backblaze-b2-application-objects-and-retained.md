# Backblaze B2, application objects and retained versions

**Inputs and owner.** Platform owns account-level provisioning. Instance/data owners select private buckets, key scope,
region, endpoint, retention and recovery. Keep Pulumi state, database backups and application uploads as separate
storage purposes with distinct access policies and credentials.

B2's S3 endpoint uses HTTPS and Signature Version4. Select the real bucket region and the endpoint form expected by the
application driver. B2 supports presigned upload/download operations, but its documentation excludes browser presigned
POST, object-level ACLs and full object tagging. Do not infer complete AWS S3 compatibility.
[Endpoint/authentication contract](https://www.backblaze.com/docs/cloud-storage-call-the-s3-compatible-api);
[S3 compatibility limits](https://www.backblaze.com/docs/cloud-storage-s3-compatible-api).

**Procedure.**

1. Read the actual storage consumer: driver, key construction, path-style setting, URL generation, browser/server upload
   path and required operations. Allocate isolated data identity before testing. ItsAPlan needs separate buckets per
   independent installation because its upstream key paths lack an installation prefix.
   [Instance storage ownership](https://github.com/Kaiju-Ind/ItsAPlan/blob/8dbe104fff3ca8b5f930aecbe2891eaeb2e0a2c5/docs/architecture.md).
2. Use the intended scoped key to write a unique synthetic object, read it through the real application and verify its
   content. Exercise browser CORS/presigned behavior only when that route exists. Test unauthorized access separately; a
   working download does not prove privacy.
3. Exercise each required operation, including multipart completion/abort, copy, range reads, delete or list where the
   consumer uses them. If concurrency correctness depends on conditional writes, test the exact headers, collision and
   stale-write behavior. Documentation silence is not proof of unsupported conditional writes.
4. Check deletion and version retention independently. Verify whether prior versions or unfinished multipart uploads
   remain, who can remove them, and which lifecycle rule applies. P06 cleanup must account for retained bytes without
   deleting state or backups.
5. Prove the actual state-backend or backup-driver contract separately when those use B2. An attachment round trip does
   not establish state coordination, encryption or database restore.

**Evidence and acceptance.** Keep bucket purpose, region, credential scope, driver version, object/content digest,
access-denial result and cleanup outcome. Never retain a secret key or live presigned URL in a general report.

**Repeat and recovery.** First installation qualifies the consumer's required operation set. Each deployment checks
selected identity and changed upload/download behavior. Driver, endpoint, region, key scope, object naming, encryption,
CORS or lifecycle changes require requalification. On failure, keep the original data, identify the unsupported
operation or wrong configuration, and adapt the consumer deliberately. Do not make a private bucket public or weaken
conditional-write correctness to pass a smoke test.

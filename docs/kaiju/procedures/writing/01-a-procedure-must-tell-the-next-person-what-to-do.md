# A procedure must tell the next person what to do

A **process** connects activities to produce an intended result. A **procedure** specifies how to perform an activity.
For Kaiju, the delivery process starts with a requested change and ends with a usable preview or an accepted production
release. Individual procedures cover jobs such as checking package access, preparing a database, verifying email, or
recovering a failed rollout. This distinction follows the [ISO terminology compilation](https://committee.iso.org/files/live/sites/tc176sc1/files/Terms%20in%20TC%20176%20Standards%20Alphabetical%20Listing%20V1%202022%2009%2029.pdf).

A **checklist** records whether required actions occurred. It cannot replace the instructions, expected results, and
decisions that explain how to perform them. [EPA's SOP guidance](https://www.epa.gov/sites/default/files/2015-06/documents/g6-final.pdf) makes this distinction and recommends concise
instructions that another suitably qualified person can reproduce.

“Configure Backblaze” is a task label. A usable procedure identifies the bucket and application identity, the operations
required by the application, the check to perform from its runtime, the expected result, and the recovery step if access
fails. That level of detail lets an agent act without inventing a provider contract.

The user outcome decides when a procedure ends. Infrastructure creation, an HTTP health response, successful login, and
a completed application workflow are different results. The procedure must name the result it proves.

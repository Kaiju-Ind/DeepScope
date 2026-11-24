# A procedure must tell the next person what to do

A **process** connects activities to produce an intended result. A **procedure** specifies how to perform an activity.
For DeepScope, the delivery process starts with a requested change and ends with a usable preview or an accepted
release. Individual procedures cover jobs such as checking a browser API, building and loading each browser, publishing
a release or recovering from a store rejection. This distinction follows the [ISO terminology compilation][iso].

A **checklist** records whether required actions occurred. It cannot replace the instructions, expected results, and
decisions that explain how to perform them. [EPA's SOP guidance][epa] makes this distinction and recommends concise
instructions that another suitably qualified person can reproduce.

“Publish to AMO” is a task label. A usable procedure identifies the add-on id and API credentials by reference, the
archive and sources zip to upload, the check to perform first (`mise run lint:firefox`), the expected result, and the
recovery step if the submission is rejected. That level of detail lets an agent act without inventing a provider contract.

The user outcome decides when a procedure ends. Infrastructure creation, an HTTP health response, successful login, and
a completed application workflow are different results. The procedure must name the result it proves.

[iso]: https://committee.iso.org/files/live/sites/tc176sc1/files/Terms%20in%20TC%20176%20Standards%20Alphabetical%20Listing%20V1%202022%2009%2029.pdf
[epa]: https://www.epa.gov/sites/default/files/2015-06/documents/g6-final.pdf

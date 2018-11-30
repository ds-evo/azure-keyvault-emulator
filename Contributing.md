# Contribution guide  
Contributions are much appreciated.

## Fixing a bug
If you'd like to fix a bug from the issues list please assign it to yourself and create a branch with 'feature/{issueNr}'.  
If you want to fix a but that is not in the issue list, please creat an issue first and proceed with the above.
  
When your change is done please create a merge request to the release branch the ticket is assigned to,   
If the change is valid you are requested to merge the branch yourself and close the issue once the merge is complete.  
  
### Branching model
The branching model is the [Feature branch][atlassian-branching-models-url] model.  
To read more about it see: [The atlassian branching models documentation][atlassian-branching-models-url].  
  
## Tests  
[package-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/package.json
Pull requests require succesfull builds, and the tests pipeline in the build process will fail on failed tests. Also this project has a predefined code coverage in the [package.json][package-url], if this percentage isn't met the build will also fail.  
  
[test-folder]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/tst
[ava-url]: https://github.com/avajs/ava
[nyc-url]: https://github.com/istanbuljs/nyc
The tests can be found in the "[~/tst/][test-folder]", [ava][ava-url] and [nyc][nyc-url] are used for the unit-tests and configured in the [package.json][package-url].
  
## Deployments
The deployments are completely automated based on the Git-Tags, as soon as a tag is made the pipeline will publish the package to npmjs.org.  
The responsibility for releasing is scoped to project admins.

[//]: # (Labels)

[atlassian-branching-models-url]: https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow
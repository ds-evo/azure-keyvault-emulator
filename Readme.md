[//]: # (Header)

<div align="center">
  <a  href="https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator#readme" 
      align="center" >
      <img  width="250" height="150" 
            align="center" alt="azure-keyvault-emulator" title="azure-keyvault-emulator" 
            src="https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/raw/master/resource/banner.png?inline=false" />
  </a>
</div>
  
[![License][license-image]][license-url] 
[![NPM version][npm-version-image]][npm-package-url] 
[![Downloads][npm-downloads-image]][npm-package-url]  
[![Build Status][build-image]][build-url]  
  
[//]: # (Documentation)
  
```plaintext
npm install -g azure-keyvault-emulator@latest
```
<sub>Requires node of version later than 8.12.0</sub>
  
## Summary  
  
A emulation utility for faking the Azure KeyVault.  
Azure doesn't support you accessing the KeyVault from another AD account then the Vault is hosted,  
however sometimes you might want that. Or at least host an open source repository without sharing your 
api-keys with the world.  
  
## Usage  
  
To use the module you simply install this npm module globally and run ```azure-keyvault-emulator start```.  
After you've started the server you can register json files that can be used to fake a subscribtion in Azure.  
  
[subscribtion-file-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/lib/AzureKeyVault/SubscribtionFile.ts
[joke-url]: https://www.youtube.com/watch?v=6n3pFFPSlW4

You do this by running ```azure-keyvault-emulator subscribe {subscribtionName} {filePath}```,  
after you do this the secrets of the file can be read by navigating to "[http://localhost:10003/{subscribtionName}/secrets/{keyName}][joke-url]".  
This endpoint will expose a json model like Azure KeyVault does.  
The filePath has to point to a json file specced according to the [SubscribtionFile][subscribtion-file-url] type definition; basically meaning that it should contain a list of properties pointing to a string or an object.  
The reference will not be loaded in memory untill every request so you do not need to issue the subscribe command again after you edit the file.  
  
You can issue the subscribe command for existing files without consequense so you can add this to your pre-build steps for example.  
```xml
<Target Name="EmulateKeyVault" 
  BeforeTargets="PreBuildEvent" 
  Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">

  <Exec Command="azure-keyvault-emulator subscribe &quot;$(ProjectName)&quot; &quot;$(ProjectDir)secrets.json&quot;" />

</Target>
```
  
[command-reference-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/Command%20reference.md
For a more detailed view of the commands see the [Command reference][command-reference-url].
  
## [Contributing][contributing-url]  
[contributing-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/Contributing.md
  
See the [Contribution guide][contributing-url] for help about contributing to this project.  
  
## [Changelog][changelog-url]  
[changelog-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/Changelog.md
  
See the [Changelog][changelog-url] to see the change history.  
  
[//]: # (Labels)

[npm-package-url]: https://www.npmjs.com/package/azure-keyvault-emulator
[npm-version-image]: https://img.shields.io/npm/v/azure-keyvault-emulator.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dm/azure-keyvault-emulator.svg?style=flat-square

[license-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/License.md#blob-content-holder
[license-image]: https://img.shields.io/badge/license-Apache--2.0-blue.svg?style=flat-square
[build-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/pipelines
[build-image]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/badges/master/build.svg?style=flat-square
[coverage-image]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/badges/master/coverage.svg?style=flat-square
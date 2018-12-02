# Command reference  
  
A more in depth description of the possible commands.  
  
## Documentation commands  
  
| Help | |
| --- | --- |
| _Example_ | ```azure-keyvault-emulator help``` |
| _Summary_ | Short command help text will also be shown on incorrect usage |
  
| Docs | |
| --- | --- |
| _Example_ | ```azure-keyvault-emulator docs``` |
| _Summary_ | Opens the documentation url in the default system browser, this is a refernce to the gitlab repository page |  
  
## Run commands  
  
| Start | |
| --- | --- |
| _Example_ | ```azure-keyvault-emulator start``` |
| _Summary_ | Start the emulator daemon without keeping the console occupied, will log a message when the service is already running |  
  
| Stop | |
| --- | --- |
| _Example_ | ```azure-keyvault-emulator stop``` |
| _Summary_ | Stop the emulator daemon without keeping the console occupied, will log a message when the service is not running |  
  
| Restart | |
| --- | --- |
| _Example_ | ```azure-keyvault-emulator start``` |
| _Summary_ | Start the emulator daemon without keeping the console occupied, will log a message when the service is not running |  
  
## Registration commands  
  
[subscribtion-file-url]: https://gitlab.com/Marvin-Brouwer/azure-keyvault-emulator/blob/master/lib/AzureKeyVault/SubscribtionFile.ts

| Listen | |  
| --- | --- |
| _Example_ | ```azure-keyvault-emulator listen {subscribtionName} {filePath}``` |
| _Parameters_ | **subscribtionName**: An aribtrary string used to identify the subscribtion in the url |
|  | **filePath**: The path to the file used to store secrets. This file has to be a json file  specced according to the [SubscribtionFile][subscribtion-file-url] type definition. |
| _Summary_ | Will register a secrets file for the server to be used |  
  
## Misc commands  
  
| Host | |
| --- | --- |
| _Example_ | ```azure-keyvault-emulator host [portNumber]``` |
| _Parameters_ | **portNumber (optional)**: Optional override on the port used for the emulator, defaults to 10003 |
| _Summary_ | Short command help text will also be shown on incorrect usage |  
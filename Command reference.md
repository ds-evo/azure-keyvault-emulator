# Command reference  
  
A more in depth description of the possible commands.  
  
## Documentation commands  
  
<table>
  <tr><th align="left">
    <code>azure-keyvault-emulator help</code>
  </th></tr><tr><td>
    <img src="/resource/table-spacer.gif" width="500" height="1"/>
    <p>
      Short command help text,<br />
      will also be shown on incorrect usage
    </p>
  </td></tr>
</table>
&nbsp;
<table>
  <tr><th align="left">
    <code>azure-keyvault-emulator docs</code>
  </th></tr><tr><td>
    <img src="/resource/table-spacer.gif" width="500" height="1" />
    <p>
      Opens the documentation url in the default system browser,<br />
      this is a refernce to the gitlab repository page
    </p>
  </td></td>
</table>
  
## Run commands  
  
<table>
  <tr><th align="left">
    <code>azure-keyvault-emulator start</code>
  </th></tr><tr><td>
    <img src="/resource/table-spacer.gif" width="500" height="1"/>
    <p>
      Start the emulator daemon without keeping the console occupied,<br />
      will log a message when the service is already running
    </p>
  </td></tr>
</table>
&nbsp;
<table>
  <tr><th align="left">
    <code>azure-keyvault-emulator stop</code>
  </th></tr><tr><td>
    <img src="/resource/table-spacer.gif" width="500" height="1" />
    <p>
      Stop the emulator daemon without keeping the console occupied,<br />
      will log a message when the service is not running
    </p>
  </td></td>
</table>
&nbsp;
<table>
  <tr><th align="left">
    <code>azure-keyvault-emulator restart</code>
  </th></tr><tr><td>
    <img src="/resource/table-spacer.gif" width="500" height="1" />
    <p>
      Restart the emulator daemon without keeping the console occupied,<br />
      will log a message when the service is not running
    </p>
  </td></td>
</table>
  
## Subscription commands  
  
<table>
  <tr><th align="left">
    <code>azure-keyvault-emulator subscribe {subscriptionName} {filePath}</code>
  </th></tr><tr><td>
    <img src="/resource/table-spacer.gif" width="500" height="1" />
    <ul>
      <li><strong>subscriptionName</strong>:
        An aribtrary string used to<br />
        identify the subscription in the url
      </li>
      <li><strong>filePath</strong>: 
        The path to the file used to store secrets.<br />
        This file has to be a json file specced according to<br />
        the <a href="lib/AzureKeyVault/SubscriptionFile.ts">SubscriptionFile</a> type definition
      </li>
    </ul>
    <p>
      Will register a secrets file for the server to be used
    </p>
  </td></td>
</table>
  
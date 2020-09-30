##
## Download NuGet.exe
##
$sourceNugetExe = "https://dist.nuget.org/win-x86-commandline/latest/nuget.exe"
$targetNugetExe = ".\nuget.exe"
Remove-Item .\Tools -Force -Recurse -ErrorAction Ignore
Invoke-WebRequest $sourceNugetExe -OutFile $targetNugetExe
Set-Alias nuget $targetNugetExe -Scope Global -Verbose

##
## Download Microsoft.IdentityModel.Clients.ActiveDirectory.dll
##
./nuget install Microsoft.IdentityModel.Clients.ActiveDirectory -O .\Tools
md .\Tools\Microsoft.IdentityModel.Clients.ActiveDirectory
$prtFolder = Get-ChildItem ./Tools | Where-Object {$_.Name -match 'Microsoft.IdentityModel.Clients.ActiveDirectory.'}
move .\Tools\$prtFolder\lib\net45\*.* .\Tools\Microsoft.IdentityModel.Clients.ActiveDirectory
Remove-Item .\Tools\$prtFolder -Force -Recurse

##
## Remove NuGet.exe
##
Remove-Item nuget.exe
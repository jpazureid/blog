##
## Create self signed certificate
##
$cert = New-SelfSignedCertificate -Subject "CN=SelfSignedCert" -CertStoreLocation "Cert:\CurrentUser\My"  -KeyExportPolicy Exportable -KeySpec Signature
$cert

##
## Export new self signed certificate as .cer file
##
$cerfile = ".\SelfSignedCert.cer"
Export-Certificate -Cert $cert -FilePath $cerfile

# References
https://gist.github.com/austin-king/59bf8110ab81b657b262a4d3cabe721b
https://github.com/interledgerjs/moneyd
https://github.com/interledgerjs/ilp-protocol-spsp

# Notes
Deployed to azure vm
Must also have moneyd running for process to connect to testnet. Open in other ssh session or run in background
```
moneyd xrp:start --testnet
```
or
```
moneyd xrp:start --testnet 2>&1 &
```
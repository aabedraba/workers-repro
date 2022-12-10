# Cloudflare Workers multipart upload failure repro 

`http` here is [httpie](https://httpie.io/)
```sh
http -f PUT https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/workers/scripts/unbundled \
"X-Auth-Email: $CF_AUTH_EMAIL" \
"X-Auth-Key: $CF_AUTH_API_KEY" \
metadata@metadata.json \
'index.js@src/index.js;type=application/javascript+module' \
'config.js@src/config.js;type=application/javascript+module`'
```

**output** 
```json
{
    "errors": [
        {
            "code": 10002,
            "message": "workers.api.error.internal_server"
        }
    ],
    "messages": [],
    "result": null,
    "success": false
}
```

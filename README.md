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
```sh
PUT /client/v4/accounts/HIDDEN/workers/scripts/unbundled HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 699
Content-Type: multipart/form-data; boundary=0aac1753605f438c834004d0b1f54ac3
Host: api.cloudflare.com
User-Agent: HTTPie/3.2.1
X-Auth-Email: HIDDEN
X-Auth-Key: HIDDEN

--0aac1753605f438c834004d0b1f54ac3
Content-Disposition: form-data; name="metadata"; filename="metadata.json"
Content-Type: application/json

{
  "main_module": "index.js"
}
--0aac1753605f438c834004d0b1f54ac3
Content-Disposition: form-data; name="index.js"; filename="index.js"
Content-Type: application/javascript+module

import { config } from "./config.js";
export default {
  async fetch() {;
    return new Response(config.message);
  },
};

--0aac1753605f438c834004d0b1f54ac3
Content-Disposition: form-data; name="config.js"; filename="config.js"
Content-Type: application/javascript+module`

export const config = {
  message: "hello",
};

--0aac1753605f438c834004d0b1f54ac3--


HTTP/1.1 500 Internal Server Error
CF-Cache-Status: DYNAMIC
CF-Ray: 7779dedd299503a8-MAD
Connection: keep-alive
Content-Encoding: gzip
Content-Type: application/json; charset=UTF-8
Date: Sat, 10 Dec 2022 23:48:19 GMT
Server: cloudflare
Set-Cookie: __cflb=hidden; SameSite=Lax; path=/; expires=Sun, 11-Dec-22 02:18:20 GMT; HttpOnly
Set-Cookie: __cfruid=hidden; path=/; domain=.api.cloudflare.com; HttpOnly; Secure; SameSite=None
Transfer-Encoding: chunked
Vary: Accept-Encoding
x-envoy-upstream-service-time: 44

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

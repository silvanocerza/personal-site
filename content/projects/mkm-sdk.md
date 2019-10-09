+++
title = "MKM SDK"
link = "https://github.com/evonove/mkm-sdk"
description = "SDK for Magic Card Market"

categories = ["python"]
layout = "portfolio"
+++

Written completely in Python and uses only [requests](https://github.com/kennethreitz/requests) and [requests_oauthlib](https://github.com/requests/requests-oauthlib/) as dependencies.

It uses Python's powerful reflection to resolve dynamically at runtime the APIs endpoint. For example if one would want to get the informations of the currently logged user:

{{< highlight python >}}
from mkmsdk.mkm import Mkm
from mkmsdk.api_map import _API_MAP

mkm = Mkm(_API_MAP["2.0"]["api"], _API_MAP["2.0"]["api_root"])
response = mkm.account_management.account()
{{< /highlight >}}

Or to set the logged user's vacation status:

{{< highlight python >}}
response = mkm.account_management.vacation(params={"onVacation": "true"})
{{< /highlight >}}

`response` will be always be an instance of [requests.Response](http://docs.python-requests.org/en/latest/api/?highlight=response#requests.Response), no matter which call.

This can work because all APIs endpoints are mapped in `_API_MAP`, which is nothing but a plain `dict`.
Each endpoint specifies its url, method and a small description like so:

{{< highlight python >}}
"account": {
    "url": "/account",
    "method": "get",
    "description": "Get the Account entity of the authenticated user",
},
"vacation": {
    "url": "/account/vacation/{vacation}",
    "method": "put",
    "description": "Updates the vacation status of the authenticated user; returns the Account entity",
}
{{< /highlight >}}

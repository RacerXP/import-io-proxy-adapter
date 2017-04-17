# import-io-proxy-adapter
This project serves as a proxy adapter to work with the Import.io API

The import-io-proxy-adapter, also known as, Proxy Adapter retrieves extractor information according to the Import.io API Key provided. The Proxy Adapter can get the following information:
 
* All extractors associated with the given API Key

* Information about a specfic extractor according to the unique identifier of the extractor

* An aggregation of information from all extractors that have the suffix, `x-extractor`, appended to the extractor's description

#Setting the environment variable for the API Key

The Proxy-Adapter requires that the Import.io API Key assigned to the given user be present in the environment variable, `IMPORT_IO_KEY`. Thus, you need to assign the value the API Key to according to the method perscribed by the computer's operating system.

Here are the details for assigning environment variables:

* [Windows](https://superuser.com/questions/800670/assigning-a-windows-environment-variable-to-a-batch-variable#800678)

* [MAC](http://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion#7502061)

* [Linux](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)

# End points

## /api/:id

### method
GET

### path parameters
**`id`**

The unique guid that identifies the extractor to return.

*Example:*

`/api/c2d08f75-c968-496f-a72b-a49ec95ad15d`

`/api/c2d08f75-c968-496f-a72b-a49ec95ad15d?refresh=true`


### query parameters

**`aggregate`**

A boolean value that sets the return of the call to be an aggregation of all data in eligible extractors according to a common data format. This parameter is ignored when a `id` is provided as a path parameter.

Default: `false`

*Example:*

`/api?aggregate=true`

**`refresh`**

A boolean value that forces a refresh of the extractor on Import.io before data is returned.

*Example:*

`/api?refresh=true`

**`page`** (not implemented)

A numeric value that indicates the page of extractor data to return. Some extractors might have hundreds of entries that can be retrieved on a page by page basis. Setting the page number will return only those entries for that page.




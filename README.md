## Usage

Create a database:

`curl 'https://json.homebots.io/new'`

```json
{
  "id": "cdc0cafc15b857a2a61d292c0a30359091f57c9bc430f0785d0ed564f0b1fb9b"
}
```
#### POST

The following command will create a user in `/user/123`:

```shell
curl -XPOST -H "Content-type: application/json" -d '{ "name": "John Doe" }' 'https://json.homebots.io/cdc0cafc15b857a2a61d292c0a30359091f57c9bc430f0785d0ed564f0b1fb9b/user/123'
```

#### GET
The following command will retrieve the user we created earlier:
```shell
curl -XGET 'https://json.homebots.io/cdc0cafc15b857a2a61d292c0a30359091f57c9bc430f0785d0ed564f0b1fb9b/user/123'
```

#### PUT
The following command will change the age of the user to `32`:
```shell
curl -XPUT -H "Content-type: application/json" -d '32' 'https://json.homebots.io/cdc0cafc15b857a2a61d292c0a30359091f57c9bc430f0785d0ed564f0b1fb9b/user/123/age'
```

#### DELETE
The following command will delete the user:
```shell
curl -XDELETE 'https://json.homebots.io/cdc0cafc15b857a2a61d292c0a30359091f57c9bc430f0785d0ed564f0b1fb9b/user/123'
```

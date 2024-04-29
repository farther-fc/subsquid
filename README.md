# ERC20 indexing template

A squid template indexing ERC20 transfers. The squid fetches the historical `Transfer` event, decodes and persists to a `Transfer` table. A new entry is created in the `Account` table for each address that has interacted with the contract so that one can query the transfer history for each EVM address.

Dependencies: NodeJS v16 or newer, Git, Docker.

## Setup

- Install Squid CLI:

```bash
npm i -g @subsquid/cli
```

- Inspect the list of the available archives with `sqd archives:ls` and choose the network if necessary
Set the `RPC_ENDPOINT` env variable to a chain node RPC URL. Use [secrets](https://docs.subsquid.io/deploy-squid/env-variables/#secrets) when deploying the squid to Subsquid Cloud.

## Run

```bash
npm ci
# start a local Postgres
sqd up
# build the squid
sqd build
# start both the squid processor and the GraphQL server
sqd run .
```
A GraphiQL playground will be available at [localhost:4350/graphql](http://localhost:4350/graphql).

You can also start squid services one by one:
```bash
sqd process
sqd serve
```

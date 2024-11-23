# Vouch-X

This is a fork of the original Vouch-X project, run by the DecentraMind team.

Vouch-X is a service within the VouchDAO ecosystem (https://vouch-dao.g8way.io) that utilizes https://x.com as a means to verify human users, enhancing security against sybil attacks in permaweb applications. VouchDAO allows various services to vouch for wallet addresses, confirming them as human accounts without revealing private data.


## Project Information

This project is made up of a frontend and a backend. The frontend is located in the `app` directory and it is a single page application that runs on the permaweb. The backend is located in the `server` directory and it is a nodejs server that provides X authentication services as well as the vouch record creation.

- [app](./app)
- [server](./server)


## Server
GET /vouch/info?address=AR_address
Get vouch info for a given address.

Manual vouching
node server/manual-vouch.js <AR_address> <X_handle>


## TODOs

- [ ] Show all vouch records(failed and successful)
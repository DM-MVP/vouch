# VouchX App

this app walks through a three step process to "Vouch" a user.

Step 1: Connect Wallet
Step 2: SignIn with Social Account
Step 3: Vouch Wallet

## Stack

* Svelte + Vite
* Tailwind
* Satoshi Font

## Layout

| File | Folder | Description |
| ---- | ------ | ----------- |
| main.js | src | application entry point |
| store.js | src | application shared state |
| App.svelte | src | app router |
| nav.svelte | src/components | navigation sidebar |
| layout.svelte | src/components | application layout |
| connect-wallet.svelte | src/components | connect wallet ux |
| signin-x.svelte | src/components | authorize with X/Twitter |
| success.svelte | src/components | successfully vouched wallet |


## Developer Setup

```sh
yarn
yarn dev
```

## Deploy to Arweave

```sh
yarn build
npm i -g arkb
cp [wallet] wallet.json
yarn deploy
```

## connect to telegram
1. open Telegram Authorization URL in a popup window
https://oauth.telegram.org/auth?bot_id=6490188052&origin=https%3A%2F%2Fapp.galxe.com&request_access=write&return_to=https%3A%2F%2Fapp.galxe.com%2FaccountSetting%2Fsocial
2. user will be asked to input their phone number(which connects to their telegram account), and click "Next"
3. Telegram will send a message to the user's telegram account like this:
```
xxx, we received a request to log in on app.galxe.com with your Telegram account.
To authorize this request, use the 'Confirm' button below. 

Browser: Chrome 133 on macOS
IP: 5.11.11.11 (United Kingdom)

If you didn't request this, use the 'Decline' button or ignore this message.
```
4. and the user will need to click "Confirm" at the bottom of the message
5. the popup window will go to the next step, ask the user to accept the access request

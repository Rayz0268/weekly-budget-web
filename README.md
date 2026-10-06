# Weekly Budget — Web

Weekly Budget is a paycheck-to-paycheck budgeting app. Enter what you earn each pay period, set aside money for savings, gas, insurance and bills, and it works out how much you can safely spend. As you log purchases, it shows what's left and whether you're on pace to finish the period on budget.

## Features

- **Pay-period budgeting:** periods of any length (weekly, bi-weekly, monthly) with income, savings and a spending limit worked out for you
- **Allocations and recurring expenses:** set aside money for rent, bills and subscriptions, and carry recurring expenses into each new period automatically
- **Purchase tracking:** log, edit, search and refund purchases, with a running total of what's left and a spending-pace indicator
- **Savings goal:** see how much you're projected to have left over at the end of each period
- **Calendar view:** daily spending across all your pay periods at a glance
- **Combined and archived periods:** roll several paychecks into one monthly view, and archive old periods to keep things tidy
- **Travel mode:** log purchases in a foreign currency with automatic conversion, plus an optional travel-cash allowance
- **Personalization:** light, dark and OLED themes and custom accent colors
- **Sync and backup:** sign in with Google to sync between your phone and the web, or back up and restore manually

This repo is the desktop web version, live at https://budgeting-app-dfbde.web.app. The Android app is in [weekly-budget-android](https://github.com/Rayz0268/weekly-budget-android).

## Development

- Edit `src/app.jsx`, then run `node build.js` to compile it to `public/app.js` (no runtime Babel).
- Deploy with `firebase deploy`. See `FIREBASE_SETUP.md`.

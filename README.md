# QuickBooks Expense Categorizer

A Vellum assistant plugin that audits unclassified bank feeds and "Uncategorized Expense" accounts in QuickBooks Online (QBO). Matches transaction descriptions and amounts against local receipt PDFs, inbox order confirmations, and historical vendor GL classifications to stage accurate tax-deductible categories with human-in-the-loop review.

## Features
- **Bank Feed Ingestion:** Normalizes raw bank memo descriptors (Amazon, Home Depot, fuel stations, Square) into clean merchant records.
- **Contextual Receipt Matching:** Matches dollar amounts and dates against email receipts and local PDF vaults using OCR text extraction.
- **GL & Chart of Accounts Classification:** Automatically maps recurring transactions to your custom Chart of Accounts with confidence ratings.
- **Audit Defense Notes:** Links meeting attendees and calendar notes to meal and travel expenses to satisfy IRS Section 274 deduction requirements.
- **Apple-Designed Review Surface:** Interactive Preact table for one-click batch review before syncing directly to QuickBooks Online.

## Installation

Inside Vellum:
```bash
assistant plugins install quickbooks-expense-categorizer
```

Or install via the Vellum Plugin Marketplace.

## License
MIT

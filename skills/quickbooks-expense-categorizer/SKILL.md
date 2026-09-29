---
name: "quickbooks-expense-categorizer"
description: "Scans unclassified bank feed transactions and Uncategorized Expense accounts in QuickBooks Online, matches receipts from email and local vaults, suggests chart-of-accounts allocations, and stages clean journal entries for one-click approval."
metadata:
  emoji: "🧾"
  vellum:
    display-name: "QuickBooks Expense Categorizer"
    activation-hints:
      - "categorize quickbooks expenses"
      - "clear uncategorized expenses in quickbooks"
      - "reconcile quickbooks bank feed"
      - "match receipts to quickbooks transactions"
      - "clean up unclassified deposits"
    avoid-when:
      - "contractor missed call dispatch"
      - "ecommerce wismo support"
    category: commerce
---

# QuickBooks Expense Categorizer

Audits unclassified bank feeds and "Uncategorized Expense" accounts in QuickBooks Online (QBO). Matches transaction descriptions and amounts against local receipt PDFs, inbox order confirmations, and historical vendor GL classifications to stage accurate tax-deductible categories with human-in-the-loop review.

## Trigger & Input
Triggered during weekly bookkeeping reviews, month-end close prep, or tax season reconciliation:
- Uncategorized transaction list from QuickBooks Online bank feed (date, description, amount, account)
- Connected receipt storage (local folder, scanned PDFs, Gmail/email context)
- Client Chart of Accounts (COA) mapping rules

## Execution Workflow

### 1. Bank Feed Ingestion & Normalization
Ingests raw, cryptic bank strings (e.g. `AMZN MKTP US*2B90X`, `SQR* BLUE BOTTLE COFFEE`, `HOME DEPOT #1204`) and normalizes merchant names, transaction dates, and debit/credit amounts.

### 2. Contextual Receipt & Vendor History Matching
- Scans connected inbox receipts and local document vaults for matching timestamps and dollar figures.
- Evaluates past 6–12 months of client GL history to identify established account patterns (e.g., Home Depot on a job day categorized to Cost of Goods Sold - Job Materials, whereas Home Depot on a Sunday categorized to Office Maintenance).
- Assigns target Chart of Accounts (COA) category (e.g., *Job Supplies*, *Software & SaaS*, *Meals & Entertainment*, *Vehicle Expense*).

### 3. Confidence Scoring & Tax Flagging
- Assigns confidence rating: High (95%+ match with verified receipt), Medium (pattern match against historical vendor rules), Low (ambiguous merchant requiring owner note).
- Flags potential Schedule C audit triggers (meals with no attendee notes, personal card co-mingling, capital equipment over $2,500 that requires depreciation).

### 4. Human-in-the-Loop 1-Click Batch Approval
- Stages clean batch entries in the Apple-designed Expense Reviewer table.
- **Safety Gate:** The assistant never posts unreviewed transactions directly to QuickBooks Online. The business owner or bookkeeper reviews recommendations and clicks **"Approve & Push to QuickBooks"** to post adjustments via API/batch update.

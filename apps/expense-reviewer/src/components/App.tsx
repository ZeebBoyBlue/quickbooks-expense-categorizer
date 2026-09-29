import { useState } from "preact/hooks";

interface ExpenseItem {
  id: string;
  date: string;
  vendor: string;
  rawMemo: string;
  amount: number;
  account: string;
  category: string;
  confidence: "high" | "medium" | "low";
  confidenceScore: number;
  matchSource: string;
  scheduleC: string;
  auditNote: string;
  status: "staged" | "approved" | "edited";
}

const DEMO_EXPENSES: ExpenseItem[] = [
  {
    id: "TX-1049",
    date: "Sep 26, 2026",
    vendor: "The Home Depot",
    rawMemo: "HOMEDEPOT #1204 AUSTIN TX",
    amount: 348.12,
    account: "Chase Business Checking (..8912)",
    category: "Cost of Goods Sold: Job Materials",
    confidence: "high",
    confidenceScore: 94,
    matchSource: "Matched Friday job site tag + trade MCC",
    scheduleC: "Part III, Line 36: Purchases",
    auditNote: "Copper fittings and PEX line for 1424 Elm St plumbing work order.",
    status: "staged",
  },
  {
    id: "TX-1050",
    date: "Sep 25, 2026",
    vendor: "Google Workspace",
    rawMemo: "GOOGLE *WORKSPACE_VELLUM CC",
    amount: 36.00,
    account: "Amex Blue Business (..4011)",
    category: "Software & Subscriptions",
    confidence: "high",
    confidenceScore: 98,
    matchSource: "Recurring vendor rule + matching PDF receipt in Gmail",
    scheduleC: "Line 18: Office Expense",
    auditNote: "Standard monthly operational email SaaS.",
    status: "staged",
  },
  {
    id: "TX-1051",
    date: "Sep 24, 2026",
    vendor: "Chevron Service Station",
    rawMemo: "CHEVRON 00921473 SAN JOSE CA",
    amount: 68.45,
    account: "Chase Business Checking (..8912)",
    category: "Automobile & Truck Expense: Fuel",
    confidence: "high",
    confidenceScore: 95,
    matchSource: "Fuel MCC + work truck fleet card tag",
    scheduleC: "Line 9: Car and Truck Expenses",
    auditNote: "Fuel for Ford F-250 service truck #2.",
    status: "staged",
  },
  {
    id: "TX-1052",
    date: "Sep 23, 2026",
    vendor: "Blue Bottle Coffee",
    rawMemo: "SQ *BLUE BOTTLE COFFEE NEW YORK",
    amount: 28.50,
    account: "Amex Blue Business (..4011)",
    category: "Meals & Entertainment (50%)",
    confidence: "medium",
    confidenceScore: 78,
    matchSource: "Matched Google Calendar meeting with prospective client",
    scheduleC: "Line 24b: Deductible Meals",
    auditNote: "Requires business attendee documentation for IRS Section 274 audit defense.",
    status: "staged",
  },
  {
    id: "TX-1053",
    date: "Sep 22, 2026",
    vendor: "AMZN Mktp US*9283K",
    rawMemo: "AMZN Mktp US*9283K 800-279-9920",
    amount: 142.19,
    account: "Chase Business Checking (..8912)",
    category: "Office Supplies & Software",
    confidence: "medium",
    confidenceScore: 82,
    matchSource: "Inbox order search: 3-pack thermal label rolls + HDMI hub",
    scheduleC: "Line 18: Office Expense",
    auditNote: "Shipping supplies and desk accessories.",
    status: "staged",
  },
];

export function App() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(DEMO_EXPENSES);
  const [selectedId, setSelectedId] = useState<string>("TX-1049");
  const [filterConfidence, setFilterConfidence] = useState<string>("all");

  const selectedItem = expenses.find((e) => e.id === selectedId) || expenses[0];

  const handleApprove = (id: string) => {
    setExpenses(expenses.map((e) => (e.id === id ? { ...e, status: "approved" } : e)));
  };

  const handleApproveAll = () => {
    setExpenses(expenses.map((e) => ({ ...e, status: "approved" })));
  };

  const filteredItems = filterConfidence === "all" ? expenses : expenses.filter((e) => e.confidence === filterConfidence);
  const totalStaged = expenses.filter((e) => e.status === "staged").length;
  const totalVolume = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ maxWidth: "880px", margin: "28px auto", padding: "0 20px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
            🧾
          </div>
          <div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "22px", margin: 0, fontWeight: 400, color: "#191816" }}>QuickBooks Expense Categorizer</h1>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#666" }}>Audit unclassified bank feeds & match receipts before month-end close</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", background: "#F4F3EE", color: "#444", padding: "4px 10px", borderRadius: "6px", fontWeight: 500 }}>
            ${totalVolume.toFixed(2)} across {expenses.length} txns
          </span>
          {totalStaged > 0 && (
            <button
              onClick={handleApproveAll}
              style={{
                background: "#216C37",
                color: "#FFFFFF",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Approve All ({totalStaged}) →
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["all", "high", "medium"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilterConfidence(lvl)}
            style={{
              background: filterConfidence === lvl ? "#191816" : "#FFFFFF",
              color: filterConfidence === lvl ? "#FFFFFF" : "#555",
              border: "1px solid rgba(0,0,0,0.12)",
              padding: "5px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {lvl === "all" ? "All Confidence" : `${lvl} Confidence`}
          </button>
        ))}
      </div>

      {/* Main Grid: List + Detail Drawer */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "16px" }}>
        {/* Transaction Table */}
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)", background: "#FAFAF9", display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr", fontSize: "11px", fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>Merchant / Description</span>
            <span>Suggested Category</span>
            <span style={{ textAlign: "right" }}>Amount</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {filteredItems.map((item) => {
              const isSelected = item.id === selectedItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    padding: "12px 16px",
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 1fr",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                    background: isSelected ? "#F3F7F4" : item.status === "approved" ? "#FAFCFA" : "#FFFFFF",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: "#191816", display: "flex", alignItems: "center", gap: "6px" }}>
                      {item.vendor}
                      {item.status === "approved" && <span style={{ color: "#216C37", fontSize: "11px" }}>✓</span>}
                    </div>
                    <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{item.date} · {item.account}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#333", fontWeight: 500 }}>{item.category}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                      <span style={{
                        fontSize: "10px",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        fontWeight: 600,
                        background: item.confidence === "high" ? "#EBF5EC" : "#FEF3C7",
                        color: item.confidence === "high" ? "#216C37" : "#92400E",
                      }}>
                        {item.confidenceScore}% confidence
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 600, fontSize: "13px", color: "#191816" }}>
                    ${item.amount.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit & Classification Detail Drawer */}
        <div style={{ background: "#FAFAF9", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#888", fontWeight: 600 }}>Classification Audit</div>
            <h3 style={{ fontSize: "16px", margin: "4px 0 0", color: "#191816", fontFamily: "Georgia, serif" }}>{selectedItem.vendor}</h3>
            <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>Raw Memo: <code style={{ fontSize: "11px", background: "#EAE9E5", padding: "2px 4px", borderRadius: "4px" }}>{selectedItem.rawMemo}</code></div>
          </div>

          <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "11px", color: "#888", fontWeight: 500 }}>Target QuickBooks GL Account</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#216C37", marginTop: "2px" }}>{selectedItem.category}</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>Mapped to: <strong>{selectedItem.scheduleC}</strong></div>
          </div>

          <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "11px", color: "#888", fontWeight: 500 }}>Context & Evidence Trail</div>
            <div style={{ fontSize: "12px", color: "#333", marginTop: "3px" }}>{selectedItem.matchSource}</div>
            <div style={{ fontSize: "11px", color: "#555", marginTop: "6px", fontStyle: "italic", borderLeft: "2px solid #216C37", paddingLeft: "8px" }}>
              "{selectedItem.auditNote}"
            </div>
          </div>

          <div style={{ marginTop: "auto", display: "flex", gap: "8px" }}>
            {selectedItem.status === "approved" ? (
              <div style={{ width: "100%", textAlign: "center", padding: "8px", background: "#EBF5EC", color: "#216C37", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>
                ✓ Pushed to QuickBooks Bank Feed
              </div>
            ) : (
              <button
                onClick={() => handleApprove(selectedItem.id)}
                style={{
                  width: "100%",
                  background: "#191816",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "9px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Approve & Push to QuickBooks (${selectedItem.amount.toFixed(2)})
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

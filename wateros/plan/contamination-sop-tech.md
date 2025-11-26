# SOP Technical Requirements
**Version:** 1.0 | **Last Updated:** 2025-11-22

**The Incident Response Plan is impossible without this data structure. The "Order" flow must be built as a "Batch Traceability" flow.**

---

## 1. Key Data Models

### FillRecord (The "Batch"):
**This is the most important data object. It is created every time a driver does a Layer 2 check.**

```
fill_id (Primary Key)
driver_id (Foreign Key)
truck_id (Foreign Key)
depot_id (Foreign Key)
timestamp_fill_up
layer2_test_results (Object: {turbidity: 4.1, tds: 220, atp: 50})
layer2_test_photo_url
```

---

### DeliveryRecord (The "Order"):
**This is the customer-facing order. It must be linked to a FillRecord.**

```
delivery_id (Primary Key)
customer_id (Foreign Key)
fill_id (Foreign Key) <-- This is the critical link
timestamp_delivery_scheduled
timestamp_delivery_complete
volume_liters
```

**Note**: A single `FillRecord` (e.g., 5,000L) may be linked to multiple `DeliveryRecords` (e.g., five 1,000L deliveries).

---

### AuditRecord (The "Police"):
**This is created by the Ops Manager in the Admin Dashboard for a Layer 3 test.**

```
audit_id (Primary Key)
ops_manager_id
timestamp_sample_taken
fill_id (Foreign Key) <-- This links the audit to the truck, depot, and driver
test_type (e.g., "E. coli", "Heavy Metals")
lab_reference_id (e.g., "SGS-12345")
status (Enum: "PENDING", "POSITIVE", "NEGATIVE")
result_timestamp
```

---

## 2. Admin Dashboard Functional Requirements

**The Admin dashboard cannot just be a list of orders. It must have:**

### A "Mark as POSITIVE" Button:
On every "PENDING" `AuditRecord`.

### Automated Actions:
Clicking that button must trigger the suspension of the associated `truck_id` and `depot_id`.

### Automated Queries:
The dashboard must have a page that automatically runs the two "Traceback" queries from the SOP to generate the "High-Risk" and "Potential-Risk" customer lists, complete with names and phone numbers.

### Source Blacklisting:
A simple "Ban" button on all `truck_id` and `depot_id` profiles.

---

## Summary

**This data architecture is the "how." It's the only way to track a batch from a depot, into a truck, to a customer's door, and then be able to trace it all back when a test fails 24 hours later.**

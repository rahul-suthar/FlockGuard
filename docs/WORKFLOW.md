# 🚀 Workflow & Report Lifecycle

This document explains the **end-to-end flow** of the BioFarm platform, showing how different user roles (Farmer, Vet, Pharmacy, Admin) interact with the system.

## 👨‍🌾 Farmer Journey

1. **Login/Register** → farmer signs in to the portal.  
2. **Create Farm Profile** → add farm details (type, size, location).  
3. **Upload Sick Animal Image** → system triggers ML model to predict possible disease.  
4. **Report Generated** → stored with AI prediction + recommended actions.  
5. **Consult Vet** → farmer sends report for vet review.  
6. **Request Medicines** → farmer requests pharmacy after vet’s prescription.  
7. **Receive Medicines** → pharmacy provides response + medicine list.  
8. ✅ **Report Closed** → workflow ends.

## 🏥 Vet Journey

1. Vet logs in → sees reports with status `vet_review`.  
2. Reviews the report → adds diagnosis, notes, and prescription.  
3. Report status updates to `pharmacy_requested`.  

## 🏪 Pharmacy Journey

1. Pharmacy logs in → sees reports with status `pharmacy_requested`.  
2. Responds with medicine availability/order details.  
3. Report status changes to `closed`.  

## 🛡️ Admin Role

- Can view **all farms and reports** with pagination.  
- Creates and publishes **alerts** for farmers.  
- Monitors overall platform usage.  

## 🔔 Alerts System

- Admins or vets create alerts for nearby outbreaks.  
- Farmers automatically see alerts relevant to their region.  

## 📝 Report Lifecycle (States)

```mermaid
flowchart TD
    A[New: Farmer uploads image] --> B[Vet Review Requested]
    B --> C[Pharmacy Requested]
    C --> D[Pharmacy Responded]
    D --> E[Closed]

    -------------------------------------------------------------

    new (farmer uploads image)
        ↓
    vet_review (farmer consults vet)
        ↓
    pharmacy_requested (vet prescribes, farmer requests medicines)
        ↓
    closed (pharmacy responds & fulfills order)

# 🐖🐓 BioFarm - Digital Farm Biosecurity Portal

A full-stack platform to help pig & poultry farmers implement biosecurity measures, detect diseases early, and receive timely alerts — empowering farmers with digital tools for healthier livestock and improved productivity.

## 🌍 Problem Statement (SIH25006)

Pig & poultry farms in India face devastating disease outbreaks like **Avian Influenza (bird flu)** and **African Swine Fever (ASF)**.
These outbreaks cause mass culling, huge economic losses, and threaten food security — with smallholder farmers most affected.

📉 Example losses:

- ₹25,000 crore annual poultry disease losses (HPAI).

- ₹982 crore ASF losses (2021–2025, across NE states).

- 69,000+ pigs dead, 52,000+ culled in 2025 alone.

## 🎯 Our Solution

### A Digital Farm Management Portal with:

- User Roles → Farmer, Vet, Pharmacy, Admin.

- Farm Profiles → Setup pig/poultry farms with details.

- AI Disease Detection → Farmers upload images → ML model predicts disease.

- Digital Health Reports → Store reports with predictions, vet notes, and prescriptions.

- Alerts & Notifications → Admin/vets push outbreak alerts based on region.

- Training Hub → Multilingual, mobile-first biosecurity training modules.

- Marketplace Link → Farmers can directly reach vets & pharmacies for medicines (revenue model).

## 🛠️ Tech Stack

**Frontend (client):**

- React + Vite

- Tailwind CSS (mobile-first UI)

**Backend (server):**

- Node.js + Express

- MongoDB (Mongoose ODM)

- JWT Authentication + Cookies

- Cloudinary (image upload)

**ML Service (ml):**

- Flask + Python

- Pre-trained model for disease detection

**Other Tools:**

- Docker (containerization)

<!-- Firebase Auth (Google login for farmers, optional) -->

- GitHub Actions (CI/CD)

## Folder Structure

```
project-root/
│── client/
│── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│── ml/
│── docker-compose.yml
│── README.md

```

## API Endpoints (Server)

### Auth

- `POST /api/v1/users/register`

- `POST /api/v1/users/login`

- `POST /api/v1/users/logout`

- `POST /api/v1/users/refresh-token`

### Farms

- `GET /api/v1/farms/` → admin dashboard (details of all farms)

- `GET /api/v1/farms/me` → get all farms of logged-in farmer

- `POST /api/v1/farms/me` → Add a farm (farmer Only)

- `GET /api/v1/farms/:id` → get farm details

- `PUT /api/v1/farms/:id` → update farm details

- `DELETE /api/v1/farms/:id` → delete farm

### Reports

- `POST /api/v1/reports` → upload image, trigger ML model, save report

- `GET /api/v1/reports/:id` → view report

### Alerts

- `POST /api/v1/alerts` → admin creates alert

- `GET /api/v1/alerts` → farmers see alerts

## Demo Flow (MVP)

- **👨‍🌾 Farmer logs in** → creates farm profile.

- **📸 Uploads sick animal image** → ML model predicts disease.

- **📝 Report generated** → stored with prediction + suggested actions.

- **🔔 Alerts** → farmer notified if outbreak is near.

- **🏥 Optional** → farmer connects to vet/pharmacy.

## Future Scope

- IoT sensor integration for real-time farm monitoring.

- Government API integration for official outbreak data.

- Advanced AI risk assessment tools.

- Expand to other livestock sectors.

## Team - Club Sphere

- Backend, ML, Frontend
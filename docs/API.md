# API Endpoints (Server)

## Auth

- `POST /api/v1/users/register`

- `POST /api/v1/users/login`

- `POST /api/v1/users/logout`

- `POST /api/v1/users/refresh-token`

## Farms  (farmer Only, filtered for Admin in controllers)

- `GET /api/v1/farms` → get farms with pagination (
    - farmer: Only their farms
    - Admin: all farms
    )

- `POST /api/v1/farms` → create new farm (farmer Only)

- `GET /api/v1/farms/:id` → get farm details

- `PUT /api/v1/farms/:id` → update farm details

- `DELETE /api/v1/farms/:id` → delete farm

## Reports

- `GET /api/v1/farms/:id/reports` → view all reports of farm

- `POST /api/v1/farms/:id/reports` → create new report (uploading image)

- `GET /api/v1/farms/:id/reports/:rid` → get report details

- `DELETE /api/v1/farms/:id/reports/:rid` → delete report (farmer owns, admin any)

- `PATCH /api/v1/farms/:id/reports/:rid/consult-vet` → farmer sends report for vet review

- `PATCH /api/v1/farms/:id/reports/:rid/review` → vet reviews and updates report

- `PATCH /api/v1/farms/:id/reports/:rid/request-medicines` → farmer requests pharmacy for medicines

- `PATCH /api/v1/farms/:id/reports/:rid/respond` → pharmacy responds with medicines/order

## Admin

- `GET /api/v1/admin/farms` → get all farms with pagination

- `GET /api/v1/admin/reports` → get all reports across farms with pagination

- `GET /api/v1/admin/alerts` → get all alerts

- `POST /api/v1/admin/alerts` → create alerts
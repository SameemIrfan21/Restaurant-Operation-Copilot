# Restaurant-Operation-Copilot

## Project Overview

This repository contains a restaurant management application built with:

- React frontend (Vite + TypeScript)
- FastAPI backend
- PostgreSQL database

## What was implemented

- React frontend displays restaurant menu items
- FastAPI backend serves CRUD API routes for menu items
- PostgreSQL stores menu items
- CORS enabled so frontend can call backend
- Basic form validation for create/update operations
- Seed data added at backend startup for testing

## Folder structure

- `backend/` - FastAPI application, SQLAlchemy models, database setup
- `frontend/` - React application created with Vite

## Requirements

### Backend

Install Python 3.11+ and create a virtual environment in `backend/`.

```bash
cd backend
python -m venv venv
venv\Scripts\Activate.ps1   # PowerShell
pip install -r requirements.txt
```

### Frontend

Install Node.js 18+ and npm packages in `frontend/`.

```bash
cd frontend
npm install
```

## Run the application

### Start backend

```powershell
cd c:\all\restaurant-operation-copilot\backend
.\venv\Scripts\python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Start frontend

```powershell
cd c:\all\restaurant-operation-copilot\frontend
npm run dev
```

The frontend should open automatically in the browser and use the backend API at `http://localhost:8000`.

## GitHub Push

```powershell
git add .
git commit -m "One week implementation: React frontend, FastAPI backend, PostgreSQL integration"
git push origin main
```

If remote already has commits:

```powershell
git pull --rebase origin main
git push origin main
```

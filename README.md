# Student CRUD Application

A full-stack Student Management CRUD system with a **Spring Boot REST API** backend and a **Vite + React (JavaScript) + Tailwind CSS** frontend.

---

## 📁 Project Structure

```text
student-crud/
├── backend/                       # Spring Boot REST API
│   ├── src/main/java/com/ocampo/student/
│   │   ├── Student.java               # Student JPA Entity
│   │   ├── StudentRepository.java     # CRUD Repository
│   │   ├── StudentController.java     # REST Controller (/ocampo/students)
│   │   └── StudentApplication.java    # Spring Boot Entry Point
│   ├── src/main/resources/
│   │   └── application.properties     # Configured for Local & Render DB
│   ├── Dockerfile                     # Multi-stage Docker build for Render
│   └── pom.xml
│
├── frontend/                      # Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── api/
│   │   │   └── studentApi.js          # API client with VITE_API_URL support
│   │   ├── components/
│   │   │   ├── Header.jsx             # Top bar with real-time stats
│   │   │   ├── StudentForm.jsx        # Inline Form (Add & Edit modes)
│   │   │   ├── StudentTable.jsx       # Table with search, filter & inline delete
│   │   │   └── Notification.jsx       # Status toast alerts
│   │   ├── App.jsx                    # State orchestrator & layout
│   │   └── index.css                  # Tailwind CSS setup
│   ├── vite.config.js                 # Dev proxy configuration
│   └── package.json
│
├── render.yaml                    # Render Blueprint (Infrastructure as Code)
├── .gitignore
└── README.md
```

---

## ☁️ Deploying to Render (render.com)

This repository includes a `render.yaml` Blueprint specification, enabling automated setup of the PostgreSQL database, Spring Boot Web Service, and Vite Static Site with zero manual wiring!

### Option A: Automated Blueprint Deployment (Recommended)

1. Go to **[dashboard.render.com](https://dashboard.render.com/)**.
2. Click **New +** $\rightarrow$ Select **Blueprint**.
3. Connect your repository: **`AchillesOcampo/student-crud`**.
4. Render will read `render.yaml` and show:
   * **`student-db`** (PostgreSQL Database)
   * **`student-backend`** (Web Service via Docker)
   * **`student-frontend`** (Static Site via Vite React)
5. Click **Apply**.
6. Render will automatically build the database, compile the backend, wire the environment variables, and build the frontend!

---

### Option B: Manual Deployment Steps

If you prefer setting up each component manually in the Render dashboard:

#### 1. PostgreSQL Database
- **New +** $\rightarrow$ **PostgreSQL**
- Name: `student-db`, Database: `ocampo_student`, Plan: **Free**.
- Copy the **Internal Database URL** or Hostname.

#### 2. Backend Web Service
- **New +** $\rightarrow$ **Web Service** $\rightarrow$ Connect `AchillesOcampo/student-crud`.
- Root Directory: `backend`
- Runtime: **Docker** (detects `backend/Dockerfile`)
- Add Environment Variables:
  - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<Internal-Host>:5432/ocampo_student`
  - `SPRING_DATASOURCE_USERNAME`: `<User>`
  - `SPRING_DATASOURCE_PASSWORD`: `<Password>`
- Click **Deploy Web Service** and copy the backend URL (`https://student-backend-xxxx.onrender.com`).

#### 3. Frontend Static Site
- **New +** $\rightarrow$ **Static Site** $\rightarrow$ Connect `AchillesOcampo/student-crud`.
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variable:
  - `VITE_API_URL`: `https://student-backend-xxxx.onrender.com`
- Redirects/Rewrites:
  - Add Rewrite: `/*` $\rightarrow$ `/index.html` (Status: `Rewrite`)
- Click **Deploy Static Site**.

---

## 💻 Local Development

### 1. Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```
Runs at `http://localhost:8080`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173` with proxy routing `/ocampo` to port 8080.

---

## 🔌 API Endpoints

Base Path: `/ocampo/students`

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/ocampo/students` | Retrieve all students | None |
| `GET` | `/ocampo/students/{id}` | Retrieve student by ID | None |
| `POST` | `/ocampo/students` | Create new student | `{ firstname, lastname, course, section }` |
| `PUT` | `/ocampo/students/{id}` | Update student by ID | `{ firstname, lastname, course, section }` |
| `DELETE` | `/ocampo/students/{id}` | Delete student by ID | None |

---

## 👤 Author
- **Achilles Isaiah S. Ocampo** ([@AchillesOcampo](https://github.com/AchillesOcampo))

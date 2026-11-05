# Student CRUD Application

A full-stack Student Management CRUD system with a **Spring Boot REST API** backend and a **Vite + React (JavaScript) + Tailwind CSS** frontend.

---

## 📁 Project Structure

```text
student-crud/
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/com/ocampo/student/
│   │   ├── Student.java               # Student JPA Entity
│   │   ├── StudentRepository.java     # CRUD Repository
│   │   ├── StudentController.java     # REST Controller (/ocampo/students)
│   │   └── StudentApplication.java    # Spring Boot Entry Point
│   ├── src/main/resources/
│   │   └── application.properties     # PostgreSQL & JPA Configuration
│   └── pom.xml
│
├── frontend/                 # Vite + React + Tailwind CSS
│   ├── src/
│   │   ├── api/
│   │   │   └── studentApi.js          # API client for CRUD endpoints
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
└── README.md
```

---

## 🚀 Features

- **Full CRUD Operations**:
  - **Create**: Add new student with First Name, Last Name, Course, and Section.
  - **Read**: View all students with search and course filtering.
  - **Update**: Edit existing student details directly in the inline form.
  - **Delete**: Safe delete with inline confirmation (no popup modals).
- **Modal-Free Responsive Layout**:
  - Side-by-side dashboard layout (Form panel on the left, live table on the right).
- **Modern UI / UX**:
  - Styled with **Tailwind CSS**.
  - Icons from **Lucide React**.
  - Live search by Name, Course, Section, or ID.
  - Course filter dropdown with count badges.
  - Inline alerts for success, edit, and error notifications.
- **CORS Handling**:
  - Vite development proxy routes all `/ocampo` requests directly to `http://localhost:8080`.

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

## 🛠️ Getting Started

### 1. Backend Setup (Spring Boot)

#### Prerequisites
- Java 17 or higher
- PostgreSQL running locally on port `5432` with a database named `ocampo_student`

#### Database Configuration
Ensure your PostgreSQL credentials in `backend/src/main/resources/application.properties` match your local setup:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ocampo_student
spring.datasource.username=postgres
spring.datasource.password=admin
```

#### Run the Backend
```bash
cd backend
./mvnw spring-boot:run
```
The backend will start at `http://localhost:8080`.

---

### 2. Frontend Setup (Vite + React)

#### Prerequisites
- Node.js (v18+) and npm

#### Install Dependencies & Start
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at **`http://localhost:5173`**.

---

## 👤 Author
- **Achilles Isaiah S. Ocampo** ([@AchillesOcampo](https://github.com/AchillesOcampo))

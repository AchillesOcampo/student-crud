const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
const BASE_URL = `${API_BASE}/ocampo/students`;

/**
 * Fetch all students from backend
 */
export async function getAllStudents() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch students (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single student by ID
 */
export async function getStudentById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Student #${id} not found or failed to fetch (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Create a new student
 */
export async function createStudent(studentData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: studentData.firstname.trim(),
      lastname: studentData.lastname.trim(),
      course: studentData.course.trim(),
      section: studentData.section.trim(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (Status: ${response.status})`);
  }

  return response.json();
}

/**
 * Update an existing student by ID
 */
export async function updateStudent(id, studentData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: studentData.firstname.trim(),
      lastname: studentData.lastname.trim(),
      course: studentData.course.trim(),
      section: studentData.section.trim(),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student (Status: ${response.status})`);
  }

  return response.json();
}

/**
 * Delete a student by ID
 */
export async function deleteStudent(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete student #${id} (Status: ${response.status})`);
  }

  return response.text();
}

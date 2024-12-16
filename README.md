# Phonebook Application

This is a simple Phonebook application backend built with Node.js and Express. The application allows users to manage their phonebook contacts by providing RESTful API endpoints.

## Online Application

You can access the deployed backend here:

👉 [Phonebook Backend](https://phonebook-backend-36ad.onrender.com/)

## Features

- Add new contacts to the phonebook.
- Retrieve a list of all contacts.
- Update existing contact information.
- Delete contacts from the phonebook.
- JSON-based API for easy integration with frontend applications.

## Usage

### Backend Endpoints

1. **GET /api/contacts**  
   Retrieve all contacts.

2. **POST /api/contacts**  
   Add a new contact.  
   **Request Body (JSON):**
   ```json
   {
     "name": "John Doe",
     "phone": "123-456-7890"
   }
   ```

3. **PUT /api/contacts/:id**  
   Update an existing contact by ID.  
   **Request Body (JSON):**
   ```json
   {
     "name": "Updated Name",
     "phone": "987-654-3210"
   }
   ```

4. **DELETE /api/contacts/:id**  
   Delete a contact by ID.

### Testing the Application

You can test the backend using the following tools:
- **Browser**: Access `GET` endpoints to retrieve data.
- **Postman**: Test all endpoints (GET, POST, PUT, DELETE) with full control over request headers and bodies.
- **VS Code REST Client**: Use `.http` files to test API calls directly within your editor.

## Technologies Used

- **Node.js**: Backend runtime.
- **Express**: Web framework for building RESTful APIs.
- **Render**: Platform for deploying the backend.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd phonebook-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Build the frontend (if applicable) and link it with the backend:
   ```bash
   npm run build:ui
   ```

5. Deploy to a hosting service like Render.

## Deployment

The backend is deployed on **Render**, accessible via the link provided above.

---

### License

This project is licensed under the MIT License. Feel free to use and modify it for your needs.

---


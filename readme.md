# Placement Cell Website

## Overview
The Placement Cell Website is a web application designed to streamline and manage placement-related activities within an educational institution. It provides functionalities for teachers to manage student and company data, schedule interviews, and track placement outcomes efficiently. The platform also integrates job opportunities using an external Job API.

![placement_cell](https://github.com/user-attachments/assets/2f499443-fe4a-40dd-a033-e7eb24fb63fe)

## Features

### Authentication
- **Login System**: Teachers can log in using a username and password.
- **Google Authentication**: An alternative secure login method using Google.

![signin page](https://github.com/user-attachments/assets/8ed9a951-d15f-43a2-a106-b5cb7e638f95)

### Student and Company Management
- Add and manage student details.
- Add and manage company details.
![placement_cell](https://github.com/user-attachments/assets/ff272a5d-5f24-4eda-b7b7-27cab41e415a)

### Student Profile

![student](https://github.com/user-attachments/assets/91b67bec-1274-4891-8cb6-70d853c96f4c)

### Interview Scheduling
- Schedule interviews between students and companies.
- Specify the date, role, and initial verdict.
- Update the verdict after the interview.

![interview](https://github.com/user-attachments/assets/5eeb3146-04d0-4842-955c-e0384c83f220)

### Data Export
- Export all student data, including placement information, in CSV format for record-keeping and reporting.

![csv](https://github.com/user-attachments/assets/d1f56539-a610-4ea8-ac09-e4c30e2ad22d)
![csv_data](https://github.com/user-attachments/assets/5e0ea434-1a56-4ce4-a221-7d434b88db3b)

### External Job Opportunities
- View external job opportunities through integration with a Job API.

![ext_jobs](https://github.com/user-attachments/assets/08a3f86d-3bbe-48cd-91f8-b8493f34cc91)

## Tech Stack
- **Backend**: Node.js, MongoDB, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MongoDB
- **Authentication**: OAuth 2.0 for Google Authentication

## Setup and Installation

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install  # or pip install -r requirements.txt
   ```
4. Configure environment variables:
   - Add the database credentials and Job API key in the `.env` file.
   ```env
   DATABASE_URL=<database_url>
   JOB_API_KEY=<job_api_key>
   GOOGLE_CLIENT_ID=<google_client_id>
   GOOGLE_CLIENT_SECRET=<google_client_secret>
   ```
5. Run the application:
   ```bash
   npm start  # or python manage.py runserver
   ```

## Usage

1. **Login**: Teachers login using either their credentials or Google.
2. **Add Details**:
   - Navigate to the **Students** page to add or update student details.
   - Navigate to the **Companies** page to manage company information.
3. **Schedule Interviews**:
   - Go to the **Interviews** page and schedule interviews by selecting students and companies, specifying the date, role, and initial verdict.
4. **Update Verdicts**:
   - Edit previously scheduled interviews to update the verdict.
5. **Export Data**:
   - Export student placement data in CSV format from the **Export Data** page.
6. **View Job Opportunities**:
   - Access the **Job Opportunities** page to view external job listings powered by the Job API.

## API Integration
- **Job API**: Fetch external job opportunities using an integrated third-party Job API.
- Ensure the API key is configured in the `.env` file.

## Contribution
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---

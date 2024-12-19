# Placement Cell Website

## Overview
The Placement Cell Website is a web application designed to streamline and manage placement-related activities within an educational institution. It provides functionalities for teachers to manage student and company data, schedule interviews, and track placement outcomes efficiently. The platform also integrates job opportunities using an external Job API.

## Features

### Authentication
- **Login System**: Teachers can log in using a username and password.
- **Google Authentication**: An alternative secure login method using Google.



### Student and Company Management
- Add and manage student details.
- Add and manage company details.

### Interview Scheduling
- Schedule interviews between students and companies.
- Specify the date, role, and initial verdict.
- Update the verdict after the interview.

### Data Export
- Export all student data, including placement information, in CSV format for record-keeping and reporting.

### External Job Opportunities
- View external job opportunities through integration with a Job API.

## Tech Stack
- **Backend**: [e.g., Node.js, Django, Flask] *(Specify the framework used)*
- **Frontend**: [e.g., React, Angular, HTML/CSS/JavaScript] *(Specify the framework/library used)*
- **Database**: [e.g., MySQL, MongoDB] *(Specify the database used)*
- **Authentication**: OAuth 2.0 for Google Authentication

## Setup and Installation

### Prerequisites
- [e.g., Python 3.x, Node.js, etc.] *(Specify based on your project)*
- Database setup ([e.g., MySQL/MongoDB])

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

### Deployment
- *(Add instructions if deploying on platforms like Heroku, AWS, etc.)*

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

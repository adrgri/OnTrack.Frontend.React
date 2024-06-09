# OnTrack - Project Management Web Application

OnTrack is a web application designed to streamline enterprise project management across various industries. This application addresses the need for reliable digital tools to replace traditional paper-based or verbal project planning methods, often leading to conflicts and miscommunications. OnTrack aims to provide tools that facilitate project management and synchronize the efforts of all team members.

## Key Features

- **Intuitive User Interface**: designed to be user-friendly and visually appealing, ensuring ease of use.
- **Project Management**: tools to plan, manage and monitor projects effectively.
- **Responsive Design**: utilizes the React framework to create responsive user interfaces that adapt to different screen sizes and devices.

## Functions and Pages

### User Authentication
- **Login Page**: secure login for users.

  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/53d07413-b423-4ab8-bf69-152946df3aa5">

- **Registration Page**: user registration with necessary details.

  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/af35257a-3e6e-476b-9c3e-d149283c49a2">


### My Tasks Page

<img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/53b378e1-358a-40eb-bd0d-c2cf539207d3">

- **Editing**: modify tasks as needed.

  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/b95ab48e-c742-4589-811d-f21a4f4bc812">

- **Gantt Chart**: visualize task schedules and dependencies.

  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/ba8915ca-fa47-4953-acda-1ac0ff3f8e22">

- **Drag and Drop**: organize tasks by status.
  
  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/ea65b670-1e6b-4d78-b291-001f72a8d786">

- **Three Dots Menu**: access additional options.
  - **Edit**: modify task details.
  - **Delete**: remove tasks.
  
  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/2adb43ce-0b7f-4c68-90bf-c68d3d83d0b2">

### Projects Page

<img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/ad2cfb0a-e5a5-45e0-a162-0c214add94cb">

- **Edit Projects**: modify existing projects.
  - **Project Name**: change the project name.
  - **Members**: manage project members.

  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/77fc4831-959e-45e0-b36e-9ec021770d76">

- **Add Project**: create new projects.
  - **Project Name**: set a project title.
  - **Members**: add team members.
 
  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/1b95bbf1-92c6-404e-86a7-74cce512c040">

- **Gantt Chart**: track project timelines and progress.
- **Progress Status**: monitor the current status of projects.
- **Three Dots Menu**: access additional options.
  - **Edit**: modify project details.
  - **Delete**: remove projects.
- **Create Task**: add new tasks within a project.
  - **Add Title**: set a task title.
  - **Add Description**: provide task details.
  - **Add Participants**: assign team members to tasks.
  - **Add Start Date**: set the task start date.
  - **Add End Date**: set the task end date.
 
  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/15957e92-f8fb-4bf1-90f3-a6dbb0983f75">


### Settings Page
- **Change First Name**: update your first name.
- **Change Last Name**: update your last name.
- **Change Password**: update your password.

  <img width="1440" alt="image" src="https://github.com/adrgri/OnTrack.Frontend.React/assets/37264241/e52cc978-da40-42b6-b4a6-edc011dfbf80">


## Technologies Used

| Technology           | Application in the Project                                                                                 |
|----------------------|------------------------------------------------------------------------------------------------------------|
| axios                | Used to send HTTP requests to external APIs, enabling communication with the server.                        |
| dayjs                | Used for date and time manipulation.                                                                       |
| DevExtreme React     | Used to create Gantt charts, enabling visualization of schedules and task dependencies.                    |
| formik               | Manages forms, handles state, validation, and submission in the application.                               |
| js-cookie            | Allows managing user sessions and storing data in browser cookies.                                         |
| mui                  | Provides a set of UI components, allowing the creation of responsive and modern user interfaces.            |
| react                | Used to create user interfaces for the OnTrack application as the main JavaScript library.                 |
| react-beautiful-dnd  | Implements the "drag and drop" function, used for task management and reordering elements.                  |
| react-router-dom     | Manages navigation and renders different components based on the URL path in the application.              |
| yup                  | Used for form and data validation in combination with Formik, ensuring the correctness of input information. |
| zustand              | Manages global state in the OnTrack application, offering a simple and scalable way to store and manage state. |


## Running the Application

### Locally
To run the application locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/OnTrack.Frontend.React.git
   cd OnTrack.Frontend.React
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

### Online
You can also access the application via the following link: [OnTrack Web Application](https://adrgri.github.io/OnTrack.Frontend.React)

Use the following login credentials:
- **Email**: test@test.com
- **Password**: Test1234.

## Thesis Project
This thesis project explores software engineering topics such as developing user-friendly, efficient, and easy-to-use web applications. It aims to provide theoretical and practical knowledge in creating project management software, contributing to the academic and professional growth of the authors.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

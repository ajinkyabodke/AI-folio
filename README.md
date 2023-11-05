[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/R4bBH-h7)
# AI portfolio builder - (Coding wars)

## 1. Introduction

The AI Portfolio builder aims to provide a simplified user interface for gathering personal and professional information from users to generate a prompt for GPT, which will then be used to create a personalised portfolio website. 

Following are the features, user interface, and technical aspects of the project.

## 2. Features

### 2.1 Template Selection

- Users can select from three template varieties: Professional, Creative, and Academic.
- Layout options include Header Positioning (top, side) and the choice to include a photo in the header. If yes then ask for the image URL.

### 2.2 Information Input

- Add a field for "Professional Summary".
- Update to allow experience entries such as Job title, company name.
- **Education** section to allow users to input their education details.
    - Relevant Courses
    - Graduation Year
    - Institution Name
- **Skills section:** to allow users add list of skills.
- **Contact** section with fields for:
    - GitHub URL
    - LinkedIn URL
    - Twitter URL

### 2.3 Template Customization

- Users can customize the primary, secondary, and background colors of the template.
- Font Selection and Font Size Adjustment are available.

### 2.4 Portfolio Generation

- Upon submission, the form data is formatted into a GPT prompt which will be sent to openAI text completion API to generate code for the portfolio website.

### 2.5 Portfolio Preview

- Users should be able to preview the code generated from the GPT.
- Users should be able to download or copy this code from your web app.

## 3. User Interface

- A single-page application with a form layout divided into three sections for Template Selection, Information Input, and Template Customization.
- A submission button labeled "Generate Portfolio" to trigger the portfolio generation process.

## 4. Technical Aspects

### 4.1 Frontend

- The app should be built using HTML, Tailwind CSS, and JavaScript. (React is optional)

### 4.2 GPT Prompt Generation

- Create a JavaScript function to format the form data into a GPT prompt string.
- The GPT prompt string is then sent to the Node.js server (which will be hosted on render, refer to the deployment section 5) to generate code for the portfolio website.

### 4.3 Accessibility

- Basic accessibility features such as semantic HTML and form labels should be implemented to ensure the app is usable by a wide audience.

## 5. Deployment

- Frontend: If you are using vanilla JS to build this, you can deploy it on the github pages. 
If you are using react you can use any of these, vercel, netlify or render. 
Once it is deployed make sure to test the link and include it in the github repo.
- Backend: This app will require a node.js API to connect to openAI with your Open AI secret key.
    - Deploy the Node.js app to [render.com](http://render.com) as a web service similar to how you have deployed the chat app in the module 0.
    - Refer to this Node.js app built during the 100x lab session https://github.com/Siddhant-Goswami/100xlabs-openai-nodejs-server/tree/main.

## 6. Advance Features

- Advanced customisation options, such as theming and custom CSS code input.
- Advanced layout options to add custom sections and images.
- Interactive preview: a real-time preview of the portfolio as users input their information and customize their template.
- Responsive design: Ensure that the generated portfolio is fully responsive, looking good and functioning well on devices of all sizes.
- Integration with the Unsplash API to add stock images.

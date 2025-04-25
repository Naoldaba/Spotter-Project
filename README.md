# Spotter-Project

A React application that provides comprehensive documentation for the Spotter Test Project, allowing users to explore and test various endpoints for flights, hotels, and car rentals.

## Features

- **Interactive API Documentation**: Browse and search through all available endpoints
- **Endpoint Search**: Filter endpoints across flights, hotels, and car hire categories
- **Provider Profiles**: View API provider information and published APIs
- **Responsive Design**: Works on desktop and mobile devices

## Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/Naoldaba/Spotter-Project.git

# Navigate to project directory
cd Spotter-Project

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

## Usage

The application will be available at `http://localhost:5173`. 

- **Main Page**: Browse API documentation and endpoints
- **Sign In/Sign Up**: Access user authentication pages
- **User Profiles**: View provider information at `/user/:username`

## Project Structure

- **App.tsx**: The root component where the application's routes and main structure are defined.
- **index.tsx**: The entry point where the React application is initialized and rendered.
- **index.css**: Global styles that are applied throughout the application.
- **components/**: Contains reusable components such as headers, menus, and profile cards.
  - **Header.tsx**: Displays the main navigation header.
  - **MobileMenu.tsx**: Displays a menu for mobile screens.
  - **MobileHeader.tsx**: A mobile version of the header.
  - **ApiCard.tsx**: A component used to display user profile information or API-related data.
- **pages/**: Contains page-level components that represent different sections of the application.
  - **LandingPage.tsx**: The main page of the application, typically displaying API documentation.
  - **SignIn.tsx**: A page for user sign-in.
  - **SignUp.tsx**: A page for user sign-up.
  - **UserProfile.tsx**: Displays the user's profile information and settings.

## Technologies

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Lucide React (for icons)

## API Sections

The documentation covers three main API categories:

1. **Flights API**: Search for flights, airports, and pricing
2. **Hotels API**: Find accommodations, check availability, and pricing
3. **Car Hire API**: Search for rental cars and locations
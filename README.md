 ## Procedures APP
 This is a Vite.js + React application simulating a CRUD operation with a backend where we can add, delete, update and Read procedures.

### Video Test

https://github.com/JCruz-Dev/pulseara-procedures/assets/13596890/c8c81ed2-9a23-4161-9a25-3a891b13f4e8

### Built With

- TypeScsript
- Supabase for the Backend (PostgreSQL)
- Vite.js
- Jotai for UI State management across component
- Tailwind & MUI for the styling and UI components
- Vitest and React-testing-Library for Testing

### Installation

1. Clone the repo
   ```sh
   git [clone https://github.com/juank1791/yelp-app](https://github.com/JCruz-Dev/pulseara-procedures.git)
   ```
2. Install NPM packages
   ```sh
   yarn install
   # or npm install
   ```
3. Run server
   ```sh
   yarn dev
   # or npm start
   ```
4. Run Tailwind compiler (if needed)
   ```sh
   npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
   ```
   <!-- USAGE EXAMPLES -->
## What is covered in the APP

- ✅ When app loads there is a empty message for the user when there is no data on backend.
- ✅ When user clicks "Editar procedimientos" appears a modal with a button to add procedures, close modal, save changes 
- ✅ When user clicks on "Agregar procedimientos" appears a form we can edit and then hit "Guardar cambios" to save the changes on Supabase
- ✅ When modal is closed, we can see the sync of data between the home screen and the modal and it apperas a snackbar called "Procedimiento agregado" when request is success.
- ✅ When there is data and we hit the button "Editar procedmimentos" the current data loads into the modal and we can edit the items or remove them.

Also..
- 🎯 We avoid multiple calls to the backend when using the Modal
- 🎯 it has responsive design for mobile and tablet
- 🎯 There are unit tests for the components Modal, ProcedureWrapper

## Contact

Juan Carlos cruz - juancarloscruz.software@gmail.com

Linkedin: [https://www.linkedin.com/in/juancarlos-cruz/](https://www.linkedin.com/in/juancarlos-cruz/)

Project Link: [https://pulseara-procedures-gr145ce85.vercel.app/](https://pulseara-procedures-gr145ce85.vercel.app/)

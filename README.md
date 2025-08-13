# Financial information management

## Description
This project is a visual dashboard for a financial information management system It provides a RESTful API for CRUD operations and supports bulk data import from CSV files. .

## How to Run the Project
1. **Clone the repository** and navigate to the project folder.

   ```git clone ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Edit the `.env` file with your database credentials (already provided in the project).
4. **Start the server:**
   ```bash
   npm start
   ```
   The server will run on the port specified in `.env` (default: 9000).
5. **Access the API:**
   - Bills: `http://localhost:9000/api/bills`
   - Advanced Queries: 
   ```
      router.get('/ad/1', billsController.getAdvancedQueries1);
      router.get('/ad/2', billsController.getAdvancedQueries2);
      router.get('/ad/3', billsController.getAdvancedQueries3);
      router.get('/ad/4', billsController.getAdvancedQueries4);
   ```

6. **Frontend (HTML pages):**
   - To test the frontend (`public/` folder), use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code or a similar tool. This ensures proper loading of resources and avoids CORS or file path issues.
   - Right-click any HTML file (e.g., `dashboard.html`, `uploadCsv.html`) and select **"Open with Live Server"**.

## Technologies Used
- **Node.js** (Express.js)
- **PostgreSQL**
- **JavaScript (ES Modules)**
- **dotenv**
- **CORS**
- **Express**
- **csv-parser**

## Normalization Explanation
The database is normalized to reduce redundancy and ensure data integrity:
- **1NF:** Each table has a primary key and atomic columns.
- **2NF:** All non-key attributes are fully functionally dependent on the primary key.
- **3NF:** No transitive dependencies exist; all attributes depend only on the primary key.

## Bulk Upload from CSV
- Place your CSV files in the `csv/` directory.
- Use the `uploadCsv.html` page to upload data.
- The backend parses and inserts the data into the corresponding tables.
- Supported CSVs: for any table, but the data has to be correctly organized in the csv.

## Advanced Queries Explanation
- The system supports advanced SQL queries, such as joining multiple tables to retrieve detailed appointment information (see `project.sql`).

## Relational Model Diagram

- ![Relational Model](./Relational%20Model.png)

## Developer Information
- **Name:** Emmanuel Rendon Goez
- **Clan:** Berners Lee
- **Email:** emarendon1301@gmail.com




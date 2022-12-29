# Institute of Cancer Research

Initial View
![Initial View](Screenshots/Initial_View.png)

Initial View with Filtering
![Initial View with Filtering](Screenshots/Initial_View_Filtering.png)

Gene Information View
![Gene Information View](Screenshots/Gene_Information_View.png)

## Requirements 
What we value:
Code style and readability
Project organization and code structure
User Interface usability good practices
Integration of suitable third-party frontend libraries (for this exercise, we don't have any preference about frameworks or libraries, except that we value using a modern SPA framework such as Vue, React, Angular, etc.).
Design of database​ (please use either Postgres or MySQL​​​​).

For both parts of the exercise, please send us your code (compressed archive or git repository), and clear instructions about how to compile and run the code. Using Docker to build/run images with your code is fine.

For the database design, please include a dump of your MySQL/Postgres​ database, or instructions on how to recreate it.


1. Frontend development exercise

Goal: To develop a simple webpage that shows a list of genes and ​​information about them. 


Requirements:
​The data can be found at https://evilfer.github.io/frontend-dev-api/data.json​ (explained below). 

​You can use any JS framework, though we value using a modern SPA framework (e.g., Vue, React, Angular, etc.).

The implementation should be a single-page-application that ​generates the HTML in the browser. Server-side rendering is not necessary. The page should be able to switch views without reloading the page. Client-side webpath routing is valued.

For look&feel, we value the integration of a third-party framework of your choice. This could be a CSS framework (such as Bootstrap), or a component library (such as Vuetify, Material UI, etc). 

Notes:
​​Using starter projects or a frontend development server is perfectly fine. 

Having the backend (see below) serve the html page and resources is also fine.

We value that the frontend fetches the data from the backend API. For this purpose, if using a development frontend server, proxying the API requests to the separate backend is fine.

Alternatively, if you develop the frontend and backend independently and disconnected, you can embed the data from the JSON file in your frontend code. In this case, please structure the code so that it'd be easy to replace the embedded JSON data with AJAX requests, and document in the code what would be needed to implement this.


Web pages specification:

Your page only needs to include two different views or pages:​
​ Initial view: As the page loads, it should display the list of genes in the "database". For each gene, it's "short_name", "image​", and the boolean "features" should be shown (see data explanation below).

Optional​: the user should be able to filter the list by the boolean "features".

From this view, the user should be able to select one gene and move from this view to the "gene information view".

If routing is used, this view would be at '/'.

Gene information view: After one gene has been selected, the view should change to display only the information about that gene. All the fields described below should be presented. From this view, the user must be able to navigate back to the "initial view"​. 
​
Optional: display the publications history of the gene in a chart (e.g., bar chart). Using an existing third party chart library should be preferred (e.g., Google Visualization).

If routing is used, this view would be at '/{gene id}'.

Data format:

The data is a JSON array containing a number of genes related to cancer research. Each element of the array contains the following fields:
 {
  "features": {
    "is_druggable": true, // Boolean, whether the gene is a drug target
    "is_enzyme": true, // Boolean, whether the gene is an enzyme
  },
  "id": "P17948", // String, gene id
  "family": "Tyr protein kinase family",  // String, gene family containing this gene
  "num_structures": 12, // Number, number of structures identified in this gene
  "num_compounds": 3337, // Number, number of compounds tested on this gene
  "description": "Also known as ...", // String
  "full_name": "Vascular endothelial growth factor receptor 1", // String
  "short_name": "FLT1", // String
  "image": "https://cdn.rcsb.org/images/rutgers/fl/1flt/1flt.pdb-250.jpg",  // String, URL of structure image representative of this gene
  "publications": [
    ["1999", 1],
    ["2000", 1]
  ] // Array, number of research publications per year involving this gene. Format: [ [year, number of publications] ] 
}

2. ​Backend development exercise

Goal: To develop a simple webserver capable of retrieving gene information from a database and provide an API to retrieve this information. 


Requirements:
​The data at https://evilfer.github.io/frontend-dev-api/data.json​ should be loaded into a MySQL/Postgres database.

​The backend can be in any language.

It should expose a REST API that includes two endpoints:
​​List a​ll genes in the database, (filtering optional). This API should include the information needed for the "initial view" in the frontend. (The request path could be something like "/api/genes")

Retrieve a specific gene, identified by field "id". This API should include all the information for the selected gene. (The request path could be something like "/api/genes/:id")


## Getting Started
The application is connected End-to-End using the following technology stacks:
    
   - Front-end - React
   - Back-end - Node
   - Database - Postgres
    
To run the application using the existing build, run the following command:

        `docker-compose up`
  
In order to build and run the application, run the following command:

        `docker-compose up -build`
        
The UI application will run on:
    [http://localhost:3000/](http://localhost:3000/)
    
The Server (API) will run on the following:
    [http://localhost:3001/api/genes](http://localhost:3001/api/genes)
    
   [http://localhost:3001/api/genes/:id](http://localhost:3001/api/genes/id) E.G: [http://localhost:3001/api/genes/P17948](http://localhost:3001/api/genes/P17948)

## Directory Structure
    File Structure:
        - project_dir/
            - docker-compose.yml (entry point to run the application end-to-end with one command)
            - /node_backend ( NODE BACK END ) - PORT - 3001
                - node_modules
                - utils/
                    - genes.sql (sql statements to set up the USER, DATABASE and TABLE)
                    - routes.js (contains all endpoints)
                - Dockerfile
                - index.js
                
            - postgres ( DATABASE ) - PORT 5432
                - /db_data (tables, configurations and schema files)
                
            - /react_frontend (REACT FRONT END) - PORT 3000
                - Dockerfile
                - public
                    - index.html
                    - manifest.json
                    - Institute_of_Cancer_Research.png
                - src
                    - components
                        - Gene (index.js and styles.css)
                        - Header (index.js and styles.css)
                        - Error (index.js)
                    - page
                        - Genes (index.js and styles.css)
                        - App.js
                        - App.test.js
                    - utils
                        - routes.js
                        - genes.json

## Unexplored 
- Testing - Jest

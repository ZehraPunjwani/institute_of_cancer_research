# Institute of Cancer Research

## Getting Started
    run `docker-compose up`

## Node_Backend
    File Structure:
    - project_dir/
        - /node_backend
            - Dockerfile
            - index.js

## Postgres
    File Structure:
    - project_dir/
        - postgres
            - /db_data (tables, configurations and schema files)

## React_Frontend
    File Structure:
    - project_dir/
        - /react_frontend
            - Dockerfile
            - public
                - index.html
                - manifest.json
                - Institute_of_Cancer_Research.png
            - src
                - components
                    - Gene (index.js and styles.css)
                    - Header (index.js and styles.css)
                - page
                    - Genes (index.js and styles.css)
                    - App.js
                    - App.test.js
                - utils
                    -routes.js

## ToDo
- Link Front end to Backend
- Backend - `image` showing as null,
          - `features` - needs to be an object
- Frontend - Link to /:id endpoint for individual gene
- Testing - Jest
- Readme update

## Setup Instructions
1. `cd server-python` and run `python -m venv env` to build your virtual environment.
2. `env/Scripts/activate` (If on Windows, use `source env/Scripts/activate` to run the virtual environment. If this doesn't work, use the path `source env/bin/activate`)
3. Run `pip install -r requirements.txt` to install all the dependencies in requirements.txt.
4. We are using Postgres for our DB rather than the default SQLite. To set up the database do the following:
  - `psql -U postgres`
  - `DROP DATABASE MERITAWARD;`, if a previous database exists.
  - `CREATE DATABASE MERITAWARD;`
  - `CREATE USER meritawarduser SUPERUSER WITH PASSWORD password;`
5. `python manage.py migrate` to run the migrations for the project.
6. `python manage.py runserver` to start the server. Navigate to http://localhost:8000/ to see the server running!

## Important Commands
 - `python manage.py runserver` runs the server, which is on http://localhost:8000/.
 - `python manage.py makemigrations` makes migration files to any changes you make in a model.
 - `python manage.py migrate` applies the changes of any new migration files to the database.
 - `python manage.py shell_plus` to run an interactive command line where you can directly interact with any of the models in the database. If you want to manually create/edit models, you can go to http://localhost:8000/ with username: meritawarduser and password: password.
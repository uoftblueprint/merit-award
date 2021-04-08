# API Documentation
The backend is written in Typescript and uses Mongoose.js, Node.js, and MongoDB.

## Routes
 - The following routes are setup for the backend:

### Auth Routes
The following routes do not require a JWT. Note that all of the signup routes and the login routes return a JWT.
  - POST api/signup/
    - body: {
      email: <email>,
      password: <password>,
      school: <school>
    }
    - Signup route for a student. Creates a new student if the email is unique.

  - POST api/signup/counselor/
    - body: {
      email: <email>,
      password: <password>,
      url: <counselorReferralURL>
    }
    - Signup route for a counselor with a valid counselor referral url provided by a student. Creates a new counselor if the email is unique and saves the student under its students field. An error is raised if no student with this URL is found. 

  - POST api/signup/reviewer/
    - body: {
      email: <email>,
      password: <password>,
      url: <reviewerReferralURL>
    }
    - Signup route for a reviewer with a valid reviewer referral url provided by a student. Creates a new reviewer if the email is unique and saves the student under its students field. An error is raised if no student with this URL is found.

  - POST api/signup/recommender/
    - body: {
      email: <email>,
      password: <password>,
      url: <recommenderReferralURL>
    }
    - Signup route for a recommender with a valid recommender referral url provided by a student. Creates a new recommender if the email is unique and saves the student under its students field. An error is raised if no student with this URL is found.

  - POST api/signup/admin/
    - body: {
      email: <email>,
      password: <password>
    }
    - Signup route for an admin.
  
  - POST api/login/
    - body: {
      email: <email>,
      password: <password>,
    }
    - Logs in with credentials provided in the body.

  - GET api/schools/
    - Gets all of the names of the schools stored in the airtable.
 

### Student Routes
These routes require a JWT.

  - PUT api/student/referral/counselor/
    - Generate a hashed counselor referral URL and saves it under the student's counselor referral field. This URL is returned.

  - PUT api/student/referral/reviewer/
    - Generate a hashed reviewer referral URL and saves it under the student's reviewer referral field. This URL is returned.

  - PUT api/student/referral/recommender/
    - Generate a hashed recommender referral URL and saves it under the student's recommender referral field. This URL is returned.


### Profile Routes
These routes require a JWT.

  - GET /api/user/profile/
    - Get the student's information.
    - Returns the following:
    ```{
      user: <userData>,
      student: <studentData>,
    }
    ```

  - PUT /api/user/update/
    - Updates the student's information.
    - The body accepts any fields in the student model and will update the corresponding fields.
    - Returns the following on success:
    ```{
      data: <updatedUserData>
    }
    ```

  - PUT /api/user/update/
    - Updates the student's password given current password and a new password. Error if current password does not match the current user.
    - Body: {
      currPassword: <User's Current Password>,
      newPassword: <User's New Password>
    }

    
### Form Routes
These routes require a JWT.
  - GET /api/forms/questions/
    - Returns the general student's application form for the current user.
    - See the FormModel field to see what the model stores.
  - GET /api/forms/questions/:page/
    - Returns a specific page for the general student's application form given by the parameter :page
  - GET /api/forms/answers/
    - Returns answers saved by the user for the student application form.
  - GET /api/forms/updateQuestions/
    - Updates the student application form table saved in Form Model with the table saved in Airtable.
    - Used for updating the saved Student Application Form with a new Airtable form. 
  - POST /api/forms/response/
    - Saves user responses to the Student Application forms with their answers provided. 
    - The following body is required:
    ```
    [
      [
        {
          "repeatableSectionAQuestion1": "answer",
          "repeatableSectionAQuestion2": "answer",
          ...
        },
        {
          "repeatableSectionAQuestion1": "answer",
          "repeatableSectionAQuestion2": "answer",
          ...
        }
      ],
      [
        {
          "repeatableSectionBQuestion1": "answer",
          "repeatableSectionBQuestion2": "answer",
          ...
        },
        {
          "repeatableSectionBQuestion1": "answer",
          "repeatableSectionBQuestion2": "answer",
          ...
        }
      ]
    ]
    ```
    - To make it clearer, the body passed is an array of repeatable sections which represents all of the questions on a given page. Each repeatable section is an array of objects which are the questions that can be repeated. Questions are represented by a key value pair corresponding to the question id and the answer given. Between objects of each repeatable section, the keys will all be identical to each other which represent identical questions that the user can provide different answers to. Thus, a page can have many repeatable sections which is why it is an array of repeatable sections.

## JWTs
  - We use JWTs to fetch user information. This JWT should be set as a Bearer token in the header and is extracted for secure routes.

## Passport
 - We use Passport.js for our authentication middleware, whose documentation can be found at passportjs.org.

### Passport strategies
  - We have a different passport strategy for each type of signup that gets called with `passport.authenticate(<strategy name>)`, which creates a different model depending on which type of user is being signed up.
  - A passport strategy is also used to login.


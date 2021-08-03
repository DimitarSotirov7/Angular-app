Sancho Panza is an angular SPA using firebase as a server side. It's a blog site where you can add your blog question and other users can discuss it. There's a "no logged user" page with all the blogs listed for review and they can be filtered by category and records displayed.

Hosting: https://angular-app-fb611.web.app/

Pages:
  No logged user:
    - Home
    - Recent Posts
    - Login
    - Register
  Logged user:
    - Home
    - Profile
    - Blogs in selected category
    - Selected blog and discussions

Firebase authentication: register the users with email and password.

Forestore Models:
  - blogCategories: seed when the admin is logged.
  - blogs: includes the discussions.
  - users: more information about the user.    

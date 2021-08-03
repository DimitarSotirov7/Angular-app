Sancho Panza is an angular SPA using firebase as a server side. It's a blog site where you can add your blog question and other users can discuss it. There's a "no logged user" page with all the blogs listed for review and they can be filtered by category and records displayed.

Hosting: https://angular-app-fb611.web.app/

Pages for No logged user:
  - Home
  - Recent Posts
  - Login
  - Register
  
Pages for logged user:
  - Home
  - Profile
  - Blogs in selected category
  - Selected blog and discussions

Firebase authentication: register the users with email and password.

Forestore Models:
  - blogCategories: seed when the admin is logged.
  - blogs: includes the discussions.
  - users: more information about the user.   

The business logic is separated in 4 services.
  - BlogService: related to all the blog operations and depends on firebase service only.
  - FirebaseService: related to firebase only and depends on firebase internal services.
  - StorageService: related to the browser local storage without any dependencies.
  - UserService: related to the user authentication and depends on firebase service and storage service.

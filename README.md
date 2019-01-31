# Running steps
1. checkout code
2. run - docker-compose up
# Assignment - Week 5

Submission date : 10th Dec

The objective is to dockerize your application, and implement scalable authentication.

## Configure Scalable Authentication using JWT

### Technical requirements
1. Dockerize your application, and write a docker-compose.yml file for starting the application and its dependencies
1. Implement a scaling mechanism for both the applications (Will be covered during Dec 6 Session)
1. For one application, use session based authentication, and for the second one, use Session-less authentication.
1. Mention the authentication details in README.md file

# Prerequisites
1. Ensure NodeJS, NPM and Git are installed
1. Ensure a Text Editor is installed. Choose one of Sublime Text 3, Visual Studio Code, or Atom
1. Ensure Docker and docker-compose is installed

# Setup
1. Start by forking and cloning this repository into your account.
1. Add your 05-socket.io repository as a remote with the command: `git add remote 05-socket.io <insert-05-socket.io-repository-url-here>`
1. git remote -v should display origin and 05-socket.io
1. pull your 05-socket.io changes into the master branch with the command: `git pull 05-socket.io master`. Now there will be merge conflict in README.md file.
1. Update the Readme.md file to these instructions, and remove the instructions from 05-socket.io.
5. Commit the changes. You are now ready to start working on this programming task.


# Submission
1. After completing the exercise/assignment, create a git tag by typing the command `git tag submission`
2. Push your tag to the server by typing the command `git push origin submission`

# Post Submission
- A mentor will review your submission, and will open an issue with review comments.
- You must resolve all the review comments, and re-submit the assignment, by following the steps in Submission

# Completion
- Submission does not mean that the assignment is complete
- Expect 2-5 Iterations before the assignment is accepted as Complete by a mentor
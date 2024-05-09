# Mini project to make REST API of a course selling website

## Tech Stack 🚀💻
### Backend -> Express, jwt 
### Database -> MongoDB
### ~Frontend -> React, Recoil~

#

## Tests Done (POSTMAN ~and FRONTEND~): ✅ 👍
- working signup feature 
- working signin feature
  - use it in every pages request header

- authenticated admin,
  - successfully creates new courses
  - successfully views their own courses (succesful use of mongodb _id reference and find filter)

- authenticated user,
  - successfully purchases new courses
  - successfully views their purchased courses (succesful use of mongodb _id reference and find filter)


#

## Bugs : ❌
- no bugs recorded for the required functioning


#

## Things learnt : 🎊
- Provide a jwt token encoded with username at signup of admin or user ✅
- Send the token back in every request header that needs the auth/login (use a middleware to authenticate) ✅

#

- MongoDB stores each user and admin with a specific purchasedCourses and createdCourses array respectively ✅
  - these arrays store the references of objectId from the Courses table when a user purchases new course or admin makes a new one
- MongoDB commands to find, update and the operators used in the process ($in, $push) ✅


#

## Run : 🚀
- Create .env in root folder and set the environment variables JWT_SECRET and MONGO_URL
- Run <code> node index.js </code> in root folder


const express = require("express")
const app = express()

const admin = require("firebase-admin")
const credentials = require("./config/key.json")

admin.initializeApp({
  credential: admin.credential.cert(credentials),
})

const db = admin.firestore()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Create a user
app.post("/create", async (req, res) => {
  try {
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }
    const response = await db.collection("users").add(userJson)
    res.status(201).send(response)
  } catch (error) {
    res.send(error)
  }
})

//get all users

app.get("/read/all", async (req, res) => {
  try {
    const userRef = db.collection("users")
    const response = await userRef.get()
    let responseArr = []
    response.forEach((doc) => {
      responseArr.push(doc.data())
    })
    res.send(responseArr)
  } catch (error) {
    res.send(error)
  }
})

//get a user
app.get("/read/:id", async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.params.id)
    const response = await userRef.get()

    res.send(response.data())
  } catch (error) {
    res.send(error)
  }
})



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

import 'dotenv/config'
import express from "express"
const app = express()
const PORT = process.env.PORT ||3000
import path from "path"
let myPath="C:\\Users\\yashb\\Desktop\\web devlopment\\4. Node js\\Projects\\Pdf Merger"
import multer  from "multer"
const upload = multer({ dest: 'uploads/' })
import { mergePdfs } from "./test.js"
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(myPath, "templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async(req, res, next)=> {
  console.log(req.files)
  let d = await mergePdfs(path.join(myPath, req.files[0].path), path.join(myPath, req.files[1].path))
  res.redirect(`http://localhost:${PORT}/static/${d}.pdf` )
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
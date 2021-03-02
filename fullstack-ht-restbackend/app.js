const express = require('express')
const path = require('path')
const crypto = require('crypto')//to generate file name
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const app = express()
const cors = require('cors')
app.use(cors())

require('dotenv/config');

const mongoURI = process.env.MONGODB_URI

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString("hex") + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
  const upload = multer({
    storage
  });

app.post("/upload", upload.single("upload"), (req, res) => {
    // console.log('testFile: ', req.file)
    res.json({ file: req.file })
    // res.redirect("/");
})

app.get("/files", (req, res) => {
    gfs.find().toArray((err, files) => {
      // check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
  
      return res.json(files);
    });
  });

app.get('/files/:filename', (req, res) => {
    gfs.findOne({ filename: req.params.filename }, (err, file) => {
        //check if files exist
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: "No files exist"
            })
        }
        //file exist
        return res.json(file)
    })
})

app.get('/image/:filename', (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files[0] || files.length === 0) {
      return res.status(200).json({
        success: false,
        message: 'No files available',
      });
    }

    if (files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png' || files[0].contentType === 'image/svg+xml') {
      // render image to browser
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      })
    }
  })
})

app.delete("/files/:id", (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'imageUpload' }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err })
        }
        res.redirect("/")
    })
})

app.get("/", (req, res) => {
    if(!gfs) {
      console.log("some error occured, check connection to db");
      res.send("some error occured, check connection to db");
      process.exit(0);
    }
    gfs.find().toArray((err, files) => {
      // check if files
      // console.log('files: ', files)
    //   if (!files || files.length === 0) {
    //     return res.render("index", {
    //       files: false
    //     });
    //   } else {
    //     const f = files
    //       .map(file => {
    //         if (
    //           file.contentType === "image/png" ||
    //           file.contentType === "image/jpeg"
    //         ) {
    //           file.isImage = true;
    //         } else {
    //           file.isImage = false;
    //         }
    //         return file;
    //       })
    //       .sort((a, b) => {
    //         return (
    //           new Date(b["uploadDate"]).getTime() -
    //           new Date(a["uploadDate"]).getTime()
    //         );
    //       });
  
    //     return res.render("index", {
    //       files: f
    //     });
    //   }
      return res.json(files);
    });
  });

//   app.get("/image/:filename", (req, res) => {
//     // console.log('id', req.params.id)
//     const file = gfs
//       .find({
//         filename: req.params.filename
//       })
//       .toArray((err, files) => {
//         if (!files || files.length === 0) {
//           return res.status(404).json({
//             err: "no files exist"
//           });
//         }
//         gfs.openDownloadStreamByName(req.params.filename).pipe(res);
//       });
//   });
  
//   // files/del/:id
//   // Delete chunks from the db
//   app.post("/files/del/:id", (req, res) => {
//     gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
//       if (err) return res.status(404).json({ err: err.message });
//       res.redirect("/");
//     });
//   });


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
const bcrypt = require("bcrypt");
const router = require("express")();

const User = require("../models/user.model");
const jwtEngine = require("../modules/authorize");
router.post(
  "/login",
  (req, res, next) => {
    // do the validtion stuff over here, this is the middlesares
    // upon validating if success then jump to next middleware
    // using return next();
    const userName = req.body.user_name;
    const password = req.body.password;
    if (!userName || !password) {
      return res.send({
        success: false,
        message: "Please enter username and password"
      });
    } else {
      return next();
    }
  },
  (req, res, next) => {
    User.find({ user_name: req.body.user_name }, (err, data) => {
      if (err) {
        res.send({
          success: false,
          message: "Your username or password is not valid."
        });
      } else {
        if (data && data.length > 0) {
          let password = data[0].password;
          let userPassword = req.body.password;
          bcrypt.compare(userPassword, password, (err, response) => {
            if (response) {
              return next();
            } else {
              res.send({
                success: false,
                message: "Your username or password is not valid."
              });
            }
          });
        } else {
          res.send({
            success: false,
            message: "Your username or password is not valid."
          });
        }
      }
    });
  },
  (req, res, next) => {
    const token = jwtEngine(req);
    if (token) {
      return res.status(200).send({
        success: true,
        message: token
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Unable to login"
      });
    }
  }
);

// // Insert a laptop in the data sent
// exports.create_user = function(req, res) {
//   let body = req.body;
//   User.find({ user_name: req.body.user_name })
//     .then(record => {
//       if (record && record.length > 0) {
//         res.send({
//           success: false,
//           message:
//             "Please enter a unique username " +
//             req.body.user_name +
//             " already exists."
//         });
//       } else {
//         bcrypt.hash(body.password, 10, (err, hash) => {
//           if (err) {
//             res.send({
//               success: false,
//               message: "There was a problem, please try again later."
//             });
//           } else {
//             body.password = hash;
//             let user = new User(body);
//             user.save(function(err) {
//               if (err) {
//                 res.send({
//                   success: false,
//                   error: err
//                 });
//               }
//               res.send({ success: true, message: "User created successfully" });
//             });
//           }
//         });
//       }
//     })
//     .catch(err => {
//       res.send({
//         success: false,
//         message: err
//       });
//     });
// };

// exports.update_user = function(req, res) {
//   let user_name = req.params.user_name;
//   User.find({ user_name: req.params.user_name }, (err, data) => {
//     if (err) {
//       res.send({
//         success: false,
//         message: err
//       });
//     } else {
//       if (req.body.hasOwnProperty("user_name")) {
//         // If username already exists, then through an error
//         // else update the data
//       } else {
//         // Update the data
//       }
//     }
//   });
// };

module.exports = router;

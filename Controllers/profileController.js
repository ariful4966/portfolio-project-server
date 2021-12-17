const Profile = require("../Models/Profile");
const User = require("../Models/User");
const decode = require("jwt-decode");

const profileGetController = async (req, res) => {
  try {
    const token = req.headers.accesstoken;
    const tokenUser = decode(token);

    if (token) {
      const extUser = await User.findOne({ email: tokenUser.email });

      await Profile.findById({ _id: extUser.profile }).populate('user', 'email role webApp blog mobile')
          .then((result) => {
            res.send({
              message: "Your Profile Information Get Successfully",
              data: result,
            });
          })
          .catch((err) => {
            res.send({
              error: err.message,
            });
          });
    }
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
};

const profilePostController = async (req, res) => {
  try {
    // console.log(req.headers.accesstoken);

    const extUser = await User.findOne({ email: req.body.email });

    if (extUser) {
      const existingProfile = await Profile.findOne({ email: req.body.email });

      if (!existingProfile) {
        const customObj = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          title: req.body.title,
          bio: req.body.bio,
          address: {
            village: req.body.village,
            upozila: req.body.upozila,
            division: req.body.division,
            country: req.body.country,
          },
          links: {
            web_url: req.body.web_url,
            git_url: req.body.git_url,
            fb_url: req.body.fb_url,
            ld_url: req.body.ld_url,
          },
          user: extUser._id,
        };
        await Profile.create(customObj)
          .then(async (result) => {
            if (result) {
              await User.updateOne(
                {
                  email: req.body.email,
                },
                {
                  profile: result._id,
                },
                {
                  new: true,
                }
              )
                .then(() => {
                  res.status(200).send({
                    data: result,
                    message: "Your Profile is create successfully",
                  });
                })
                .catch((err2) => {
                  res.send({
                    error: err2.message,
                  });
                });
            } else {
              res.send({
                error: "You have not get profile creation data",
              });
            }
          })
          .catch((error) => {
            res.send({
              error: error.message,
            });
          });
      } else {
        res.status(302).send({
          error: "You have already have a Profile",
        });
      }
    } else {
      res.status(400).send({
        error: "You Have not this email to created account",
      });
    }
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

const profilePic = async (req, res) => {
  
  try {
    const extProfile = await Profile.findOne({ email: req.body.user.email });
    if (extProfile) {
      await Profile.updateOne(
        { email: req.body.user.email },
        {
          profilePic: req.body.profilePic,
        },
        {
          new: true,
        }
      )
        .then((result) => {
          res.send({
            message: "Profile Photo Update successfully",
            data: result,
          });
        })
        .catch((error) => {
          error.message;
        });
    }else{
      res.send({
        error: "Sorry! Your have not any profile exiting"
      })
    }
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

module.exports = {
  profilePostController,
  profilePic,
  profileGetController,
};

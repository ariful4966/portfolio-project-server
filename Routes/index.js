const blogRoute = require("./blogRoutes");
const profileRoute = require("./profileRoutes");
const userRoute = require("./userRoutes");
const webRoute = require("./webRoutes");
const mobileRoute = require("./mobleRoutes");

const routes = [
  {
    path: "/blog",
    route: blogRoute,
  },
  {
    path: "/web",
    route: webRoute,
  },
  {
    path: "/mobile",
    route: mobileRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/profile",
    route: profileRoute,
  },
  {
    path: "/",
    route: (req, res, next) => {
      res.send("Home page is here Open");
    },
  },
];

module.exports = (app) => {
    
  routes.forEach((r) => {
    if(r.path === '/'){
        app.get(r.path, r.route)
    }else{
        app.use(r.path, r.route)
    }
  });
};

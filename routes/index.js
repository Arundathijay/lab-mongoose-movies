const express = require("express");

//importing the celebrity.js
const Celebrity = require("../models/celebrity");
const router = new express.Router();

// Handle GET request for website root
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities", { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/celebrities/create", (req, res) => {
  console.log("celeb creation requested");
  res.render("celebrities/create");
});

router.get("/celebrities/:id", (req, res, next) => {
  console.log("celeb id requested");
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/show", { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  console.log("celeb id to be edited");

  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render("celebrities/edit", { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      const id = celebrity._id;
      res.redirect("/celebrities/");
    })
    .catch((error) => {
      console.log("There was an error creating the celeb.");
      res.render("celebrities/create");
      next(error);
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;

  Celebrity.findById(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities/edit");
    })
    .catch((error) => {
      console.log("There was an error editing the celeb.");
      res.render("celebrities/create");
      next(error);
    });
});

//exports the router
module.exports = router;

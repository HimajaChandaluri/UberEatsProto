const express = require("express");
const router = express.Router();
const { User, validateDishInput } = require("../mongoModels/user");
const auth = require("../middleware/auth");
const restaurant = require("../middleware/restaurant");
const _ = require("lodash");
const kafka = require("../kafka/client");

const topicName = "dishes1";

router.get("/:id", auth, async (req, res) => {
  msg = {};
  msg.path = "getDishById";
  msg.params = req.params;
  kafka.make_request(topicName, msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   const restaurant = await User.findOne({
  //     $and: [{ isRestaurant: true }, { "dishes._id": { $eq: req.params.id } }],
  //   });
  //   console.log("DishRest: ", restaurant);
  //   console.log(restaurant.dishes[0]._id.toString());
  //   const dish = _.find(restaurant.dishes, (dish) => {
  //     return dish._id.toString() == req.params.id;
  //   });
  //   console.log("Dish: ", dish);
  //   res.send(dish);
  // } catch (err) {
  //   console.log("get dish: ", err);
  // }
});

router.put("/", auth, restaurant, async (req, res) => {
  msg = {};
  msg.path = "updateDishById";
  msg.body = req.body;
  msg.user = req.user;
  kafka.make_request(topicName, msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   const result = validateDishInput(req.body);
  //   if (result.error) {
  //     return res.status(400).send(result.error.details[0].message);
  //   }

  //   const restaurant = await User.findOne({
  //     $and: [{ _id: req.user._id }, { isRestaurant: true }],
  //   });

  //   console.log("Restaurant: ", restaurant);

  //   const dish = _.find(restaurant.dishes, (dish) => {
  //     return dish._id.toString() == req.body._id;
  //   });

  //   console.log("Dish: ", dish);

  //   if (dish) {
  //     dish.name = req.body.name;
  //     dish.mainIngrediant = req.body.mainIngrediant;
  //     dish.image = req.body.image;
  //     dish.price = req.body.price;
  //     dish.description = req.body.description;
  //     dish.category = req.body.category;
  //     dish.type = req.body.type;
  //   }

  //   await restaurant.save();

  //   res.send("Successfully updated dish data");
  // } catch (err) {
  //   console.log("Update dish: ", err);
  // }
});

router.delete("/:id", async (req, res) => {
  msg = {};
  msg.path = "deleteDishById";
  msg.params = req.params;
  kafka.make_request(topicName, msg, (err, results) => {
    res.status(results.status).send(results.data);
  });
  // try {
  //   console.log("GOT DELETE REQUEST DISH: ", req.params.id);
  //   await Dishes.deleteDish(req.params.id);
  //   res.send("Deleted succesfully");
  // } catch (err) {
  //   console.log("Delete dish: ", err);
  // }
});

module.exports = router;

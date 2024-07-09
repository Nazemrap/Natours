const { default: mongoose } = require("mongoose");
const moogoose = require("mongoose");

const reviewSchema = new moogoose.Schema(
  {
    review: {
      type: String,
      require: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour."],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "review must belong to a user"],
    },
  },
  {
    // When a data is not stored in the db but generated show it anyway
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

const Review = moogoose.model("Review", reviewSchema);

module.exports = Review;

// POST|GET /tour/:id/reviews
// GET /tour/:id/reviews/:idRev

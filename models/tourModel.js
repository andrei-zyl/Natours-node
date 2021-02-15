const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name!'],
        unique: true,
        trim: true,
        maxlength: [40, 'Tour name must have 40 or less characters!'],
        minlength: [10, 'Tour name must have 10 or more characters!'],
        validate: [validator.isAlpha, 'Tour name must contain only characters!']
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration!']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size!']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty!'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult'
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        max: [5, 'Rating must be equal or below 5'],
        min: [1, 'Rating must be equal or above 1']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price!']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function(val){
                return val < this.price
            },
            message: 'Discount price ({VALUE}) should be below regular price!'
        } 
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description!']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image!']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
})

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})

tourSchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower: true});
    next();
});

tourSchema.pre(/^find/, function(next){
    this.find({secretTour: {$ne: true}})
    next();
});

tourSchema.pre('aggregate', function(next){
    this.pipeline().unshift({$match: {secretTour: {$ne: true}}})
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Category } from "../models/category.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";


//Create Product
export const createProduct = catchAsyncError(async(req, res, next) => {

    const data = req.body;

    const product = await Product.create({...data, productAdmin: req.user.id});

    res.status(201).json({
        success: true,
        message: "Product created successfully!",
        product
    });
   
});

//Get Single Product
export const getSingleProduct = catchAsyncError(async(req, res, next) => {

    const product = await Product.findById(req.params.id).populate('reviews.user', 'firstName lastName avatar.url');

    if(!product) return next(new ErrorHandler(`Product is Not found for this id -> ${req.params.id}`, 400));

    res.status(200).json({
        success: true,
        product
    })
})

//Update Product
export const updateProduct = catchAsyncError(async(req, res, next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });


    if(!product) return next(new ErrorHandler(`Product is Not found for this id -> ${req.params.id}`, 400));

    res.status(201).json({
        success: true,
        product
    })

});

//Delete Product
export const deleteProduct = catchAsyncError(async(req, res, next) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product) return next(new ErrorHandler(`Product is Not found for this id -> ${req.params.id}`, 400));

    res.status(201).json({
        success: true,
        product
    })

});

//Get all Products and Apply Filter ( Category, Price range, Ratings, Tag, Featured, Pagination )
export const getAllProducts = catchAsyncError(async(req, res, next) => {

    const { category, featured, rating, tag, minPrice, maxPrice, searchingKeyword, currentPage, resultPerPage, sortBy } = req.query

    let filterQuery = {}
    let sortObj = {}


    if(category && category!=='All') filterQuery['additionalInfo.category'] = category;
    if(minPrice && maxPrice) filterQuery['price'] = { $gte: minPrice, $lte: maxPrice };
    if(featured) filterQuery['featured'] = featured;
    if(rating) filterQuery['ratings'] ={ $gte: rating};
    if(tag) filterQuery['additionalInfo.tags'] = { $in: tag };
    if(searchingKeyword) filterQuery['name'] = {$regex: searchingKeyword, $options: "i"}

    if(sortBy === 'Latest') sortObj['createdAt'] = -1
    if(sortBy === 'Price low to high') sortObj['price'] = 1

    let products = await Product.find(filterQuery);
    const productCount = products.length;

    const pages = Math.ceil(productCount/resultPerPage);
    const skip = resultPerPage * (currentPage-1);

    products = await Product.find(filterQuery).limit(resultPerPage).skip(skip).sort(sortObj);

    res.status(200).json({
        success: true,
        filterQuery,
        pages,
        currentPage,
        productCount,
        products,
        rating
    })
})

export const getCartProducts = catchAsyncError(async(req, res, next) => {
    
    const {items} = req.query;

    let products = [];
    
    if(items){
        products = await Product.find({ _id: {$in: [...items]}});
    }

    res.status(200).json({
        products
    })

})

//Create Feedback ( Give Rating out of 5 and Post a comment about specific product)
export const createFeedback = catchAsyncError(async(req, res, next) => {

    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id).populate('reviews.user', 'firstName lastName avatar.url');;

    if(!product) return next(new ErrorHandler(`Product is Not found for this id -> ${req.params.id}`, 400));

    const alreadyRated = product.reviews.filter((i)=>i.user._id == req.user.id);

    if(alreadyRated.length == 0 ){
        product.reviews.unshift({ user: req.user.id, rating, comment});
    }else{
        product.reviews.map((i)=>{
            if(i.user._id == req.user.id){
                i.rating = rating;
                i.comment = comment;
            }
        })
    }


    let totalStars = 0;
    product.reviews.map((i)=>totalStars=totalStars+i.rating);

    const averageRating = totalStars / product.reviews.length;

    product.ratings = averageRating;

    await product.save({validateBeforeSave: false})
    
    res.status(201).json({
        success: true,
        product,
    })
})

export const deleteFeedback = catchAsyncError(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) return next(new ErrorHandler(`Product is Not found for this id -> ${req.params.id}`, 400));

    const filteredReviews = product.reviews.filter((i)=>i.user != req.user.id);

    product.reviews = filteredReviews;

    let totalStars = 0;

    product.reviews.map((i)=>totalStars=totalStars+i.rating);

    let averageRating = totalStars / product.reviews.length;

    if(product.reviews.length === 0) averageRating = 0;

    product.ratings = averageRating;

    product.save({validateBeforeSave: false});

    res.status(201).json({
        success: true,
        message: "Review Deleted Successfully!",
        rev: product.reveiws
    })
})

//Create Category
export const addNewCategory = catchAsyncError(async(req, res, next) => {

    const {categoryName} = req.body;

    const alreadyExistCat = await Category.findOne({categoryName});

    if(alreadyExistCat){
        return next(new ErrorHandler(`Category: ${categoryName} is already exist`, 400))
    }

    const createCategory = await Category.create({categoryName});

    res.status(201).json({
        createCategory
    })
});

//Get Categories
export const getAllCategory = catchAsyncError(async(req, res, next) => {

    const categories = await Category.find();

    res.status(200).json({
        categories
    })
});

//Update Category
export const updateCategory = catchAsyncError(async(req, res, next) => {

    const categoryId = req.params.id;
    const { categoryName } = req.body;

    const category = await Category.findById(categoryId);

    if(!category){
        return next(new ErrorHandler(`Category is not exist exist`, 400))
    }

    category.categoryName = categoryName;

    await category.save({validateBeforeSave: true});

    res.status(200).json({
        message: 'Category updated succesfully!'
    })
});

//Delete Category
export const deleteCategory = catchAsyncError(async(req, res, next) => {

    const categoryId = req.params.id;

    const category = await Category.findByIdAndDelete(categoryId);

    if(!category){
        return next(new ErrorHandler(`Category is not exist`, 400))
    }

    res.status(200).json({
        message: 'Category deleted succesfully!'
    })
})








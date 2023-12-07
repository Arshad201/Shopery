export const catchAsyncError = (controller) =>(req, res, next) =>{

    Promise.resolve(controller(req, res, next)).catch(next);

}
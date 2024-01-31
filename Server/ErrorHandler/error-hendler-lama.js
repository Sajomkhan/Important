
// --------------root/index.js--------------------//
// ERROR HANDELING
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message =err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.listen(5010, () => {
  console.log("Server is running at port http://localhost:5010/api/");
  connect();
});

// --------------root/error.js------------------for this
// use sometime not always
export const createError = (status, message)=>{
  const err = new Error()
  err.status= status
  err.message= message
  return err
} 

//-------------- controllers/auth.js---------------use as like this

export const signup = async (req, res, next) => {
  try {

  } catch (err) {
    // use sometime not always
    next(createError(404, `Sorry! user has been not created. ${err}`))
    // max time use as like this
     next(err)
  }
};

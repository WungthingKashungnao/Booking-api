import hotelModel from "../models/hotelModel.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new hotelModel(req.body); //inserting the data from body into the schema
  try {
    const savedHotel = await newHotel.save(); //saving the data into the database
    res.status(200).json(savedHotel); //sending json response
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    // updating the database
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //{new: true} option is used so that it return the updated record
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted the hotel with id: ${req.params.id}`);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await hotelModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query; //destructuring query from the url
  let limiting = parseInt(req.query.limit); //for setting limits based on query input from user

  try {
    const hotels = await hotelModel
      .find({
        ...others,
        //for filtering hotels based on min price and max price
        cheapestPrice: { $gte: min || 1, $lte: max || 99999999999 },
      })
      .limit(limiting);
    res.status(200).json({
      hotelCount: hotels.length,
      hotels: hotels,
    });
  } catch (err) {
    next(err); //execute middleware for error handling which is written inside index.js file
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(","); //getting the cities query from the url and splitting them by comma ','
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelModel.countDocuments({ city: city }); //Returns an integer for the number of documents that match the query of the collection or view
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelModel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelModel.countDocuments({ type: "resort" });
    const villaCount = await hotelModel.countDocuments({ type: "villa" });
    const cabinCount = await hotelModel.countDocuments({ type: "cabin" });
    res
      .status(200)
      .json(
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount }
      );
  } catch (err) {
    next(err);
  }
};

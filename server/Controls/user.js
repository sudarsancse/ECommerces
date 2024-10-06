import User from "../Models/userData.js";

export const UserData = async (req, res) => {
  const { name } = req.body;
  console.log(name);

  try {
    const data = new User({
      name,
    });
    await data.save();

    res.status(201).json({
      sucess: true,
      statusCode: 201,
      message: "Sucessfully",
    });
  } catch (error) {
    console.log(error);

    res.status(401).json({
      sucess: false,
      statusCode: 401,
      message: "Not Sucessfully",
    });
  }
};

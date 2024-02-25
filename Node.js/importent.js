
// ================= set update data ====================
export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        next(err);
      }
    } else {
      return next(createError(403, "You can update only your account!"));
    }
  };

// ================= query tag ====================
// GET: http://localhost:5010/api/videos/tags?tags=js,ts,py
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(","); //Result ["js", "ts", "py"]

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// ================= query serch ====================
// GET: http://localhost:5010/api/videos?tags=js,ts,py
export const search = async (req, res, next) => {
  const query = req.query.q; //Result: js,ts,py
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// ================= mapping ====================
export const subscribe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const list = await Promise.all(
      user.subscribedUsers.map((channelId) => {
        // mapping each user _id in the subscribedUsers array
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(
      list
        .flat() // use flat to prevent individual array for mapping which call find user seperately
        .sort((a, b) => b.createdAt - a.createdAt) // sorting by latest videos
    );
  } catch (err) {
    next(err);
  }
};

// ================= sort by popular ====================
export const trend = async (req, res, next) => {
    try {
      const videos = await Video.find().sort({ views: -1 }); // views: -1 (for most views) | views: 1 (for less views)
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

  // ================= random data fetching ====================

  export const random = async (req, res, next) => {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 2 } }]); // sample size means number of videos
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };
  
  // ================= increase array in database ====================
  export const subscribeUser = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.id }, // Subscribed another user id
      });
  
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 }, // Increment subscribers numbers
      });
      res.status(200).json("Subscription successfull");
    } catch (err) {
      next(err);
    }
  };

    // ================= decrease array in database ====================
  export const unsubscribe = async (req, res, next) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { subscribedUsers: req.params.id }, // Unsubscribed another user 
      });
  
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 }, // Increment subscribers numbers
      });
      res.status(200).json("Unsubscription successfull");
    } catch (err) {
      next(err);
    }
  };
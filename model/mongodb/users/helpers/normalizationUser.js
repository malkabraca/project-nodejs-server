const normalizeUser = (userData) => {
  // userData.name = {};
  // userData.name = {
  //   firstName: userData.firstName,
  //   lastName: userData.lastName,
  // };
  // userData.address = {};
  // userData.address = {
  //   city: userData.city,
  //   street: userData.street,
  //   houseNumber: userData.houseNumber,
  //   zip: userData.zip || 0,
  // };
  //   if (!userData.image) {
  //     userData.image = {};
  //   }
  //   userData.image = {
  //     url:
  //       userData.image.url ||
  //       "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
  //     alt: userData.image.alt || "yellow fluffy chickens",
  //   };
  // console.log(userData);
  //   return {
  //     ...userData,
  //     address: {
  //       ...userData.address,
  //       state: userData.address.state || "",
  //     },
  //   };
  // if ((userData.imageUrl = "")) {
  //   userData.imageUrl =
  //     "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg";
  // }
  // if ((userData.imageAlt = "")) {
  //   userData.imageAlt = "yellow fluffy chickens";
  // }
  // return userData;
};

module.exports = normalizeUser;

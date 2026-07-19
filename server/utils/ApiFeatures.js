class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
  if (this.queryString.keyword) {
    this.query = this.query.find({
      name: {
        $regex: this.queryString.keyword,
        $options: "i",
      },
    });
  }

  return this;
}

filterCategory() {
  if (this.queryString.category) {
    this.query = this.query.find({
      category: this.queryString.category,
    });
  }

  return this;
}

filterBrand() {
  if (this.queryString.brand) {
    this.query = this.query.find({
      brand: this.queryString.brand,
    });
  }

  return this;
}

filterPrice() {
  const queryObj = {};

  if (this.queryString.minPrice) {
    queryObj.$gte = Number(this.queryString.minPrice);
  }

  if (this.queryString.maxPrice) {
    queryObj.$lte = Number(this.queryString.maxPrice);
  }

  if (Object.keys(queryObj).length) {
    this.query = this.query.find({
      price: queryObj,
    });
  }

  return this;
}

sort() {

//   const sortBy =
//     this.queryString.sort || "-createdAt";

//   this.query = this.query.sort(sortBy);

//   return this;

const allowedSorts = {
  newest: "-createdAt",
  oldest: "createdAt",
  priceAsc: "price",
  priceDesc: "-price",
  rating: "-rating",
  sold: "-sold",
};

const sortBy =
  allowedSorts[this.queryString.sort] || "-createdAt";

this.query = this.query.sort(sortBy);

return this;

}

paginate(resultPerPage) {

  const currentPage =
    Number(this.queryString.page) || 1;

  const skip =
    resultPerPage * (currentPage - 1);

  this.query = this.query
    .skip(skip)
    .limit(resultPerPage);

  return this;
}

}
export default ApiFeatures;
const promotions = ["SINGLE LOOK", "DOUBLE LOOK", "TRIPLE LOOK", "FULL LOOK"];

function getShoppingCart(ids, productsList) {
  const filteredProducts = productsList.filter((product) =>
    ids.includes(product.id)
  );
  let categories = filteredProducts.map((product) => {
    return product.category;
  });
  categories = [...new Set(categories)];

  const promotion = promotions[categories.length - 1];

  const regularTotalPrice = filteredProducts
    .reduce((sum, product) => sum + product.regularPrice, 0)
    .toFixed(2);

  const totalPrice = filteredProducts
    .reduce((sum, product) => {
      let promo = product.promotions.find((promo) => {
        console.log(promo);
        console.log(promotion);
        return promo.looks.includes(promotion);
      });
      if (!promo) {
        promo = { price: product.regularPrice };
      }
      return sum + promo.price;
    }, 0)
    .toFixed(2);

  const discountValue = (regularTotalPrice - totalPrice).toFixed(2);
  const discount = ((discountValue / regularTotalPrice) * 100).toFixed(2) + "%";

  const products = filteredProducts.map((product) => {
    return {
      name: product.name,
      category: product.category,
    };
  });

  const result = {
    products,
    promotion,
    totalPrice,
    discountValue,
    discount,
  };

  console.log(result);

  return result;
}

module.exports = { getShoppingCart };

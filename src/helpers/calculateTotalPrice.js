export function calculateTotalPrice(category) {
    let total = 0;
  
    if (category.products) {
      total += category.products.reduce((sum, product) => sum + product.price, 0);
    }
  
    if (category.subcategories) {
      category.subcategories.forEach(subcategory => {
        total += calculateTotalPrice(subcategory);
      });
    }
  
    return total;
  }
  
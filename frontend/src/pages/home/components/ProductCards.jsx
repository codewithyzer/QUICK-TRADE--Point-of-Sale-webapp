import SmallCard from "../../../components/SmallCard.jsx";

export default function ProductCards(props) {
  const categories = [
    "Electronics",
    "Home Appliances",
    "Fashion",
    "Health and Beauty",
    "Furniture",
    "Toys and Games",
    "Sports and Outdoors",
    "Automotive",
    "Groceries",
    "Book and Media",
  ];

  const categoryCards = categories.map((categoryName) => {
    const categoryProducts = props.products
      .filter((product) => product.category?.name === categoryName)
      .map((product) => <SmallCard key={product.id} {...product} />);

    if (categoryProducts.length > 0) {
      return (
        <div className="flex cursor-default flex-col gap-4" key={categoryName}>
          <div className="bg-primary rounded-t-md p-5 text-3xl font-semibold text-white">
            {categoryName}
          </div>
          <div className="fade-in grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categoryProducts}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex cursor-default flex-col gap-4" key={categoryName}>
          <div className="bg-primary rounded-t-md p-5 text-3xl font-semibold text-white">
            {categoryName}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="border-primary relative flex h-60 shrink-0 cursor-default flex-col items-center justify-center overflow-hidden rounded-sm bg-white transition-all duration-50">
              <p>No product for this category</p>
            </div>
          </div>
        </div>
      );
    }
  });
  return categoryCards;
}

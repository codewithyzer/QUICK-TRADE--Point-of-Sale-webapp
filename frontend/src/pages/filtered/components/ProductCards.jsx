import SmallCard from "../../../components/SmallCard.jsx";

export default function ProductCards(props) {
  const filteredProducts = props.products.map((product) => (
    <SmallCard key={product.id} {...product} />
  ));

  if (filteredProducts.length > 0) {
    return (
      <div className="flex min-h-screen cursor-default flex-col gap-4">
        <div className="bg-primary rounded-t-md p-5 text-3xl font-semibold text-white">
          {props.categoryName}
        </div>
        <div className="fade-in grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen cursor-default flex-col gap-4">
        <div className="bg-primary rounded-t-md p-5 text-3xl font-semibold text-white">
          {props.categoryName}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="border-primary relative flex h-60 shrink-0 cursor-default flex-col items-center justify-center overflow-hidden rounded-sm bg-white transition-all duration-50">
            <p>No product for this category</p>
          </div>
        </div>
      </div>
    );
  }
}

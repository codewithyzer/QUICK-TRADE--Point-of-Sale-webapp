import SmallCard from "../../../components/SmallCard.jsx";

export default function ProductCards(props) {
  const filteredProducts = props.products.map((product) => (
    <SmallCard key={product.id} {...product} />
  ));

  return (
    <div className="flex min-h-screen cursor-default flex-col gap-4">
      <div className="fade-in grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts}
      </div>
    </div>
  );
}

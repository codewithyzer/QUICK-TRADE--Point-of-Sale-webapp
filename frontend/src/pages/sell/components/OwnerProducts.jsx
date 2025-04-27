import LargeCard from "../../../components/LargeCard.jsx";

export default function OwnerProducts(props) {
  const ownedProducts = props.products.map((product) => (
    <LargeCard key={product.id} {...product} />
  ));

  const scrollable =
    "fade-in scrollable-h flex flex-col gap-5 overflow-y-auto pr-3";
  const notScrollable = "fade-in flex flex-col gap-5";

  return (
    <div className="flex h-297 flex-col gap-5">
      <h1 className="text-primary text-3xl font-semibold">Your Products</h1>
      <div className={ownedProducts.length < 3 ? notScrollable : scrollable}>
        {ownedProducts.length > 0 ? (
          ownedProducts
        ) : (
          <div className="border-primary flex h-70 w-120 flex-col items-center justify-center overflow-hidden rounded-xl border-1 bg-white shadow-md transition-all duration-50">
            <h1 className="text-lg font-medium text-gray-400">
              You have no products yet
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

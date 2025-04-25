import searchIcon from "../../assets/search.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import SellSidebar from "./components/SellSidebar.jsx";
import { useAuth } from "../../context/AuthContext";
import { get_products } from "../../endpoints/api.js";
import LargeCard from "../../components/LargeCard.jsx";
import ImageUpload from "../../components/ImageUpload.jsx";
import { new_product } from "../../endpoints/api.js";
import Guidline from "./components/Guidline.jsx";

export default function SellPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);

  const [newProduct, setNewProduct] = useState({
    productImage: "",
    productName: "",
    productPrice: "",
    productRFS: "",
    productCategory: "",
  });

  const [readGuidlines, setReadGuidlines] = useState(false);
  const [guidelineError, setGuidlineError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await get_products("owned_user=true");
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const ownedProducts = products.map((product) => (
    <LargeCard key={product.id} {...product} />
  ));

  const scrollable = "scrollable-h flex flex-col gap-5 overflow-y-auto pr-3";
  const notScrollable = "flex flex-col gap-5";

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreview(imageURL);
      setNewProduct((prev) => ({
        ...prev,
        productImage: file,
      }));
    }
  };

  function handleCheckboxChange() {
    setReadGuidlines((prev) => !prev);
  }

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (readGuidlines) {
      const data = await new_product(
        newProduct.productName,
        newProduct.productPrice,
        newProduct.productCategory,
        newProduct.productRFS,
        newProduct.productImage,
      );
      setNewProduct({
        productImage: "",
        productName: "",
        productPrice: "",
        productRFS: "",
        productCategory: "",
      });
      setPreview(null);
    } else {
      setGuidlineError(true);
    }
  };

  function validate() {}

  console.log(newProduct);

  return (
    <>
      <Header user={user} />
      <SellSidebar />
      <main className="font-poppins mt-[70px] ml-[284px] flex gap-10 bg-gray-100 p-8">
        <div>
          <h1 className="text-primary mb-5 text-3xl font-semibold">
            Upload a product
          </h1>
          <form
            onSubmit={handleSubmit}
            className="border-primary font-poppins flex w-165 flex-col gap-4"
          >
            <div className="relative">
              <div className="border-primary flex h-90 w-full flex-col items-center justify-center rounded-xl border-1 border-dashed bg-white shadow-sm">
                {!preview ? (
                  <>
                    <p className="text-gray-400">No Product Image</p>
                    <button
                      type="button"
                      onClick={handleClick}
                      className="bg-thirdary hover:bg-primary mt-2 cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition-all duration-200"
                    >
                      Upload Image
                    </button>
                  </>
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full rounded-xl object-cover"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChangeImage}
                name="productImage"
                className="hidden"
              />
            </div>
            <p className="text-thirdary text-[0.9rem] font-medium">
              Product details<i class="fa-solid fa-circle-info ml-1"></i>
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="productName"
                  className="text-primary text-[0.8rem]"
                >
                  Product name
                </label>
                <input
                  value={newProduct.productName}
                  type="text"
                  required
                  name="productName"
                  className="input-two border-primary text-primary rounded-lg border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="productPrice"
                  className="text-primary text-[0.8rem]"
                >
                  Product price
                </label>
                <input
                  value={newProduct.productPrice}
                  onChange={handleChange}
                  type="number"
                  required
                  name="productPrice"
                  className="input-two border-primary text-primary rounded-lg border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="productRFS"
                  className="text-primary text-[0.8rem]"
                >
                  Reason for selling
                </label>
                <textarea
                  value={newProduct.productRFS}
                  onChange={handleChange}
                  required
                  name="productRFS"
                  className="input-two border-primary text-primary max-h-50 min-h-50 rounded-lg border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
                />
              </div>
              <div className="z-10 flex flex-col gap-2">
                <label
                  htmlFor="productCategory"
                  className="text-primary text-[0.8rem]"
                >
                  Product category
                </label>
                <select
                  value={newProduct.productCategory}
                  onChange={handleChange}
                  required
                  name="productCategory"
                  className="border-primary text-primary cursor-pointer rounded-lg border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
                >
                  <option value="" disabled></option>
                  <option value="1">Electronics</option>
                  <option value="2">Home Appliances</option>
                  <option value="3">Fashion</option>
                  <option value="4">Health & Beauty</option>
                  <option value="5">Furniture</option>
                  <option value="6">Toys & Games</option>
                  <option value="7">Sports & Outdoors</option>
                  <option value="8">Automotive</option>
                  <option value="9">Groceries</option>
                  <option value="10">Book & Media</option>
                </select>
              </div>
            </div>
            <Guidline
              checkboxStatus={readGuidlines}
              changeCheckbox={handleCheckboxChange}
            />
            {guidelineError && (
              <div className="mt-[-0.4rem] text-[0.75rem] font-medium text-red-400">
                <i class="fa-solid fa-circle-exclamation"></i> Please make sure
                you agree to product upload terms and conditions
              </div>
            )}
            <button className="bg-thirdary hover:bg-primary cursor-pointer rounded-lg py-3 font-medium text-white transition-all duration-200">
              Upload Product
            </button>
          </form>
        </div>
        <div className="flex h-236 flex-col gap-5">
          <h1 className="text-primary text-3xl font-semibold">Your Products</h1>
          <div
            className={ownedProducts.length < 3 ? notScrollable : scrollable}
          >
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
      </main>
      <div></div>
    </>
  );
}

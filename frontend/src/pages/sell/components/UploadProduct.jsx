import { useState, useRef } from "react";
import Guidline from "./Guidline";
import { new_product } from "../../../endpoints/api";

export default function UploadProduct() {
  const fileInputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [readGuidlines, setReadGuidlines] = useState(false);
  const [guidelineError, setGuidelineError] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [newProduct, setNewProduct] = useState({
    productImage: null,
    productName: "",
    productPrice: "",
    productRFS: "",
    productCategory: "",
  });

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

  const validate = () => {
    const errors = {};

    if (!newProduct.productName.trim())
      errors.productName = "Product name is required.";
    if (!newProduct.productPrice) errors.productPrice = "Price is required.";
    if (!newProduct.productRFS.trim())
      errors.productRFS = "Reason for selling is required.";
    if (!newProduct.productCategory)
      errors.productCategory = "Please select a category.";

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setInputErrors(validationErrors);
      return;
    }

    if (!readGuidlines) {
      setGuidelineError(true);
      return;
    }

    try {
      const data = await new_product(
        newProduct.productName,
        newProduct.productPrice,
        newProduct.productCategory,
        newProduct.productRFS,
        newProduct.productImage,
      );
      console.log("Upload Successful:", data);

      setNewProduct({
        productImage: "",
        productName: "",
        productPrice: "",
        productRFS: "",
        productCategory: "",
      });
      setPreview(null);
      setInputErrors({});
      setGuidelineError(false);
      setReadGuidlines(false);
      setUploadSuccess(true);

      setTimeout(() => {
        setIsFadingOut(true);
      }, 4000);

      setTimeout(() => {
        setUploadSuccess(false);
        setIsFadingOut(false);
      }, 4250);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <h1 className="text-primary mb-5 text-3xl font-semibold">
        Upload a product
      </h1>
      <form
        onSubmit={handleSubmit}
        className="border-primary font-poppins flex w-165 flex-col gap-5"
      >
        <div className="relative">
          <div className="border-thirdary flex h-90 w-full flex-col items-center justify-center rounded-md border-1 border-solid bg-white shadow-sm">
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
                className="h-full w-full rounded-md object-cover"
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
        <div className="flex w-165 flex-col gap-4 rounded-md bg-white p-7">
          <p className="text-thirdary text-[0.9rem] font-medium">
            Product details<i className="fa-solid fa-circle-info ml-1"></i>
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
                name="productName"
                className="input-two border-primary text-primary rounded-md border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
                onChange={handleChange}
              />
              {inputErrors.productName && (
                <div className="mt-0.5 text-[0.75rem] font-medium text-red-400">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {inputErrors.productName}
                </div>
              )}
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
                name="productPrice"
                className="input-two border-primary text-primary rounded-md border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
              />
              {inputErrors.productPrice && (
                <div className="mt-0.5 text-[0.75rem] font-medium text-red-400">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {inputErrors.productPrice}
                </div>
              )}
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
                name="productRFS"
                className="input-two border-primary text-primary max-h-50 min-h-50 rounded-md border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
              />
              {inputErrors.productRFS && (
                <div className="mt-0.5 text-[0.75rem] font-medium text-red-400">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {inputErrors.productRFS}
                </div>
              )}
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
                name="productCategory"
                className="border-primary text-primary cursor-pointer rounded-md border-1 bg-white px-2 py-1.5 text-[0.8rem] font-semibold shadow-sm outline-none"
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
              {inputErrors.productCategory && (
                <div className="mt-0.5 text-[0.75rem] font-medium text-red-400">
                  <i className="fa-solid fa-circle-exclamation"></i>{" "}
                  {inputErrors.productCategory}
                </div>
              )}
            </div>
          </div>
          <Guidline
            checkboxStatus={readGuidlines}
            changeCheckbox={handleCheckboxChange}
          />
          {guidelineError && (
            <div className="mt-2 text-[0.75rem] font-medium text-red-400">
              <i className="fa-solid fa-circle-exclamation"></i> Please make
              sure you agree to product upload terms and conditions
            </div>
          )}
          <button className="bg-thirdary hover:bg-primary cursor-pointer rounded-lg py-3 font-medium text-white transition-all duration-200">
            Upload Product
          </button>
        </div>
      </form>
      {(uploadSuccess || isFadingOut) && (
        <div
          className={`${isFadingOut ? "fade-out" : "fade-in"} font-poppins fixed right-5 bottom-5 z-20 rounded-lg bg-green-400 p-5 text-sm font-medium text-white`}
        >
          <i className="fa-solid fa-circle-check mr-1"></i> Product upload
          succesful!
        </div>
      )}
    </div>
  );
}

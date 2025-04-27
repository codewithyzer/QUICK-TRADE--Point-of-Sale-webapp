export default function Guidline(props) {
  return (
    <ul className="text-thirdary font-sm mt-2 mb-[-0.5rem] text-[0.75rem]/5">
      <h2 className="text-thirdary text-[0.9rem] font-medium">
        <i className="fa-solid fa-bag-shopping"></i> Product Upload Guidelines
      </h2>
      <p className="mb-2 font-medium">
        Please follow these instructions when uploading a product:
      </p>
      <li>
        <i className="fa-solid fa-check mr-1"></i> Ensure the product name and
        category match the actual item.
      </li>
      <li>
        <i className="fa-solid fa-check mr-1"></i> Upload a clear and accurate
        image of the product.
      </li>
      <li>
        <i className="fa-solid fa-check mr-1"></i> Set a reasonable and honest
        price.
      </li>
      <li>
        <i className="fa-solid fa-check mr-1"></i> Clearly state the reason for
        selling (RFS).
      </li>
      <li>
        <i className="fa-solid fa-check mr-1"></i> Make sure all information
        provided is truthful and up-to-date.
      </li>

      <li>
        <div className="mt-4.5 flex">
          <input
            onChange={props.changeCheckbox}
            value={props.checkboxStatus}
            type="checkbox"
            className="accent-thirdary mr-1"
          />
          <p>I have read and accepted the product upload terms & conditions</p>
        </div>
      </li>
    </ul>
  );
}

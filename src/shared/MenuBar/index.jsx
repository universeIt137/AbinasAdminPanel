import { Link } from "react-router-dom";

const MenuBar = ({ routes }) => {
  return (
    <div className="mb-2">
      <div className="mt-4">
        <ul className="list-style-none flex">
          {routes?.map((item, index) => (
            <li
              className="mr-3 text-md font-semibold text-[#5C5C5C] border-t-2 border-t-[#5C5C5C] border-l-2 border-l-[#5C5C5C] px-2 hover:text-[#0089D0]"
              key={index}
            >
              <Link to={item.route}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;

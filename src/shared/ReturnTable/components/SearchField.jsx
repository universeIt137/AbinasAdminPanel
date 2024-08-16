import { Icon } from "@iconify/react";

const SearchField = ({
  setSearchTerm,
  handleTrack,
  searchHandler,
  searchName,
}) => {
  return (
    <div>
      <div className=" flex my-5">
        <h1 className="text-2xl font-semibold mr-4">
          Search By {searchName} No
        </h1>
        <div className=" flex items-center border-2 rounded-md">
          <input
            type="text"
            className="outline-none pl-2 w-[300px]"
            placeholder={`search by ${searchName} id`}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleTrack}
          />
          <Icon
            icon="tdesign:search"
            className="mx-2 cursor-pointer"
            onClick={searchHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchField;

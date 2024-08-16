const EditService = (props) => {
  return (
    <div>
      {/* {loading && <Loader forProcess={true} />} */}
      <h1 className="text-2xl font-semibold text-center ">Update service</h1>
      <div className=" my-5">
        <form>
          <div className="">
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">Service Name : </h1>
              <input
                type="text"
                name="serviceName"
                placeholder="type service name"
                className="input input-bordered w-[80%]"
                // value={serviceName}
                // onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">
                Service Title &nbsp;&nbsp;&nbsp;:{" "}
              </h1>
              <input
                type="text"
                name="serviceTitle"
                placeholder="type service title"
                className="input input-bordered w-[80%]"
                // value={serviceTitle}
                // onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center my-3">
              <h1 className="mr-4 text-2xl font-semibold">Service Image : </h1>
              <input
                type="file"
                name="serviceImage"
                className="file-input file-input-bordered w-[80%]"
                // value={serviceImage}
                // onChange={(e) => setServiceImage(e.target.files[0])}
              />
            </div>
            <div className="flex items-top my-3">
              <h1 className="mr-4 text-2xl font-semibold mt-2">
                KeyFeatures &nbsp; &nbsp;:{" "}
              </h1>
              <div>
                <div className="flex">
                  <input
                    type="text"
                    name="keyFeatures"
                    placeholder="type service single key features"
                    className="input input-bordered w-[500px] mr-2"
                    // value={features}
                    // onChange={(e) => setFeatures(e.target.value)}
                  />
                  <div
                    className=" bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 rounded-md text-center my-auto py-3 cursor-pointer"
                    // onClick={handleAddFeature}
                  >
                    Add Feature +{" "}
                  </div>
                </div>
                <div>
                  {/* {keyFeatures?.map((feature, index) => (
                    <span key={index} className="text-md font-semibold mr-2">
                      {index + 1}. {feature}
                    </span>
                  ))} */}
                </div>
              </div>
            </div>
            <div className="flex items-top my-3">
              <h1 className="mr-4 text-2xl font-semibold mt-2">
                Note &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
              </h1>
              <div>
                <div className="flex">
                  <input
                    type="text"
                    name="noteList"
                    placeholder="type your special note"
                    className="input input-bordered w-[500px] mr-2"
                    // value={note}
                    // onChange={(e) => setNote(e.target.value)}
                  />
                  <div
                    className=" bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 rounded-md text-center my-auto py-3 cursor-pointer"
                    // onClick={handleAddNote}
                  >
                    Add Note +{" "}
                  </div>
                </div>
                <div>
                  {/* {noteList?.map((noteItem, index) => (
                    <span key={index} className="text-md font-semibold mr-2">
                      {index + 1}. {noteItem}
                    </span>
                  ))} */}
                </div>
              </div>
            </div>
            <div className="flex items-top my-3 mt-5">
              <h1 className="mr-4 text-2xl font-semibold">
                Description &nbsp;&nbsp;&nbsp;:{" "}
              </h1>
              <textarea
                className="textarea textarea-bordered w-[80%] h-[150px]"
                name="description"
                placeholder="type your service all description here"
                // value={description}
                // onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <button
            className="btn capitalize  bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 mt-5 ml-10"
            type="submit"
          >
            Save Change
          </button>
          <button
            className="btn capitalize  bg-secondary opacity-0.5 hover:bg-secondary text-white px-8 ml-2"
            type="reset"
            onClick={() => {
              setServiceName("");
              setServiceTitle("");
              setServiceImage("");
              setFeatures("");
              setKeyFeatures([]);
              setNote("");
              setNoteList([]);
              setDescription("");
            }}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditService;

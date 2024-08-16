import { Link } from "react-router-dom";

export default function index() {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex mt-4 flex-row flex-wrap gap-8">
        <Link>
          <button className="border-t-2  p-1 border-l-2 border-gray">
            Home
          </button>
        </Link>
        <Link>
          <button className="border-t-2 p-1 border-l-2 border-gray">
            DPS Opening Form
          </button>
        </Link>
        <Link>
          <button className="border-t-2 p-1 border-l-2 border-gray">
            DPS History
          </button>
        </Link>
        <Link>
          <button className="border-t-2 p-1 border-l-2 border-gray">
            DPS Collection
          </button>
        </Link>
        <Link>
          <button className="border-t-2 p-1 border-l-2 border-gray">
            DPS Collection History
          </button>
        </Link>
        <Link>
          <button className="border-t-2 p-1 border-l-2 border-gray">
            Remaining payment
          </button>
        </Link>
        <Link>
          <button className="border-t-2 p-1 border-l-2 border-gray">
            Membership Form
          </button>
        </Link>
      </div>

      {/* part 2 */}
      <div>
        <div className="btn-group mt-6 btn-group-vertical px-0  lg:btn-group-horizontal">
          <button className="btn bg-secondary text-white">Save</button>
          <button className="btn bg-primary">Delete</button>
          <button className="btn bg-primary">Clear</button>
          <button className="btn bg-primary">Approve</button>
          <button className="btn bg-primary">Clear</button>
          <button className="btn bg-primary">undo</button>
        </div>
      </div>
    </div>
  );
}

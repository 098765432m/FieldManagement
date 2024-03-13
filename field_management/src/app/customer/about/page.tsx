import React from "react";
import Link from "next/link";

export default function CardBasic() {
  return (
    <>
      <Link
        href={{
          pathname: "/",
          query: { params1: "value1", params2: "value2" },
        }}
      >
        Click here to Back!
      </Link>
      {/*<!-- Component: Basic card --> */}
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <h3 className="mb-4 text-xl font-medium text-slate-700">
            Something to remember
          </h3>
          <p>
            All components can be copied and pasted and easily implemented in
            your tailwind css projects. You can choose which language you want
            to copy the desired component and just hover and click on the
            component you need and paste it on your project.
          </p>
        </div>
      </div>
      {/*<!-- End Basic card --> */}
    </>
  );
}
